import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const runtime = "nodejs";

const VRKP_SHARED_SECRET = process.env.VRKP_SHARED_SECRET!; // same value as ULHC_SHARED_SECRET on VRKP
const VRKP_PARTNER_ID = process.env.VRKP_PARTNER_ID ?? "vrkp";
const CLOCK_SKEW_MS = 5 * 60 * 1000; // 5 minutes

function sha256Hex(input: string) {
	return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}

type PrefillPayload = {
	vrkpId: string;
	fullName?: string;
	email?: string;
	phone?: string;
	gender?: string;
	aadhaar?: string;
	dob?: string;
};

const PREFILL_TTL_MS = 15 * 60 * 1000; // 15 mins

async function createOrRotatePrefillSession({
	partnerId,
	payload,
}: {
	partnerId: string;
	payload: PrefillPayload;
}) {
	const token = crypto.randomBytes(24).toString("base64url");
	const expiresAt = new Date(Date.now() + PREFILL_TTL_MS);

	// Optional: basic attempt throttling window
	// e.g., if attempts in the last 60s > 3, throw 429. (You'd need a per-minute counter table or Redis.)
	// For simplicity, just bump attempts.

	const row = await prisma.prefillSession.upsert({
		where: { partnerId_vrkpId: { partnerId, vrkpId: payload.vrkpId } },
		create: {
			partnerId,
			vrkpId: payload.vrkpId,
			token,
			payload,
			expiresAt,
			attempts: 1,
		},
		update: {
			token, // rotate: old token becomes invalid immediately
			payload, // keep fresh (VRKP may send updated fields)
			expiresAt, // refresh time window
			attempts: { increment: 1 },
			consumed: false, // allow another attempt even if they consumed a previous one
		},
		select: {
			token: true,
			expiresAt: true,
			attempts: true,
		},
	});

	return row; // { token, expiresAt, attempts }
}

function verifySignature(
	bodyStr: string,
	ts: string,
	sig: string,
	secret: string
) {
	if (!ts || !sig) return false;
	const now = Date.now();
	const tsNum = Number(ts);
	if (Number.isNaN(tsNum)) return false;
	if (Math.abs(now - tsNum) > CLOCK_SKEW_MS) return false;

	const bodyHash = sha256Hex(bodyStr);
	const payload = `${ts}.${bodyHash}`;
	const expected = crypto
		.createHmac("sha256", secret)
		.update(payload)
		.digest("base64");
	return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export const POST = async (req: NextRequest) => {
	try {
		const partnerId = req.headers.get("x-partner-id");
		const ts = req.headers.get("x-timestamp") ?? "";
		const sig = req.headers.get("x-signature") ?? "";

		if (partnerId !== VRKP_PARTNER_ID) {
			return NextResponse.json(
				{ ok: false, error: "unknown_partner" },
				{ status: 401 }
			);
		}

		const bodyStr = await req.text();
		const valid = verifySignature(bodyStr, ts, sig, VRKP_SHARED_SECRET);
		if (!valid) {
			return NextResponse.json(
				{ ok: false, error: "invalid_signature" },
				{ status: 401 }
			);
		}

		const prefill = JSON.parse(bodyStr) as {
			vrkpId: string;
			fullname: string;
			email: string;
			phone: string;
			gender: string;
			aadhaar: string;
			dob: string;
		};

		if (!prefill.vrkpId) {
			return NextResponse.json(
				{ ok: false, error: "vrkpId_required" },
				{ status: 400 }
			);
		}

		// Short-circuit if already present in ULHC
		const existing = await prisma.member.findUnique({
			where: { vrkpId: prefill.vrkpId },
			select: { id: true, programs: true },
		});
		if (existing && existing.programs) {
			return NextResponse.json({
				ok: true,
				alreadyRegistered: true,
				registerUrl: null,
			});
		}

		// Upsert/rotate token for multiple tries
		const { token, expiresAt, attempts } = await createOrRotatePrefillSession({
			partnerId,
			payload: prefill,
		});

		const REGISTER_BASE = process.env.REGISTER_BASE_URL!; // e.g. https://ulhc.example.com/register
		const registerUrl = `${REGISTER_BASE}?token=${encodeURIComponent(token)}`;

		return NextResponse.json({
			ok: true,
			token,
			expiresAt: expiresAt.toISOString(),
			attempts,
			registerUrl,
			alreadyRegistered: false,
		});
	} catch (error) {
		console.error("ULHC prefill error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

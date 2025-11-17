import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendMailClient } from "zeptomail";

export const runtime = "nodejs"; // Zepto SDK needs Node env

const prisma = new PrismaClient();

export async function POST() {
	try {
		const API_URL = process.env.EMAIL_API_URL;
		const TOKEN = process.env.EMAIL_TOKEN;
		const TEMPLATE_KEY = process.env.EMAIL_TEMPLATE_KEY;

		if (!API_URL || !TOKEN || !TEMPLATE_KEY) {
			return NextResponse.json(
				{ ok: false, error: "missing_email_env_vars" },
				{ status: 500 }
			);
		}

		const url = `${API_URL.replace(/\/$/, "")}/template`;
		const client = new SendMailClient({ url, token: TOKEN });

		// only 20 members
		const members = await prisma.member.findMany({ take: 20 });
		if (!members.length) {
			return NextResponse.json({ ok: true, sent: 0 }, { status: 200 });
		}

		const tasks = members.map(async (m) => {
			try {
				if (!m.email) throw new Error(`member ${m.id} missing email`);

				const to = { address: m.email, name: m.fullname ?? undefined };
				const from = {
					address: "noreply@unitylifehealthcare.com", // must be a verified sender in ZeptoMail
					name: "Unity Life Health Care",
				};

				const merge_info = {
					name: m.fullname ?? "",
					dob: m.dob ? new Date(m.dob).toISOString().split("T")[0] : "",
					aadhaar: m.aadhaar ?? "",
					address:
						(m.address ?? "").length > 20
							? `${(m.address ?? "").slice(0, 20)}...`
							: m.address ?? "",
					vrkpId: m.vrkpId ?? "",
					activationDate: m.programsStartedAt.toISOString().split("T")[0],
					expireDate: m.programsExpireAt.toISOString().split("T")[0],
				};

				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/integrations/email/confirmation`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							to,
							from,
							merge_info,
						}),
					}
				);
				const data = await res.json();
				// log success
				if (res.ok) {
					return NextResponse.json({ id: m.id, ok: true }, { status: 200 });
				} else {
					return NextResponse.json(
						{ id: m.id, ok: false, error: data.error || "unknown_error" },
						{ status: res.status }
					);
				}
			} catch (error) {
				// log failure
				await prisma.emailLog.create({
					data: {
						templateKey: TEMPLATE_KEY,
						toAddress: m.email ?? "",
						fromAddress: "noreply@unitylifehealthcare.com",
						mergeInfo: {
							name: m.fullname ?? "",
							vrkpId: m.vrkpId ?? "",
						},
						responseStatus: 500,
						responseData:
							typeof error === "object" && error
								? error
								: { message: String(error) },
						isDelivered: false,
						tag: "ULHC_REGISTRATION",
					},
				});
				return { id: m.id, ok: false, error: String(error) };
			}
		});

		// wait for all sends to finish
		const results = await Promise.allSettled(tasks);

		const summary = results.reduce(
			(acc, r) => {
				if (r.status === "fulfilled") {
					if (r.value.ok) acc.success += 1;
					else acc.fail += 1;
				} else {
					acc.fail += 1;
				}
				return acc;
			},
			{ success: 0, fail: 0 }
		);

		return NextResponse.json(
			{ ok: true, total: members.length, ...summary },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Email send batch failed:", err);
		return NextResponse.json(
			{
				ok: false,
				error: "server_error",
				details: err instanceof Error ? err.message : String(err),
			},
			{ status: 500 }
		);
	}
}

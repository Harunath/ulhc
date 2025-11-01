import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const runtime = "nodejs";

async function getSession(token: string) {
	const row = await prisma.prefillSession.findUnique({ where: { token } });
	if (!row || row.consumed || row.expiresAt < new Date()) return null;
	console.log("Prefill session retrieved:", row);
	return row;
}

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("token");
	if (!token)
		return NextResponse.json(
			{ ok: false, error: "token_required" },
			{ status: 400 }
		);

	const row = await getSession(token);
	if (!row)
		return NextResponse.json(
			{ ok: false, error: "invalid_or_expired" },
			{ status: 404 }
		);

	// Optionally mark single-use:
	await prisma.prefillSession.update({
		where: { token },
		data: { consumed: true },
	});

	return NextResponse.json({ ok: true, prefill: row.payload });
};

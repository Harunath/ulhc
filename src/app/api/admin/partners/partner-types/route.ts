import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const PartnerTypeSchema = z.object({
	name: z.string().min(2),
	slug: z.string().min(2),
	isActive: z.boolean().optional().default(true),
	priority: z.number().int().optional().default(0),
});

export async function GET() {
	try {
		const types = await prisma.partnerType.findMany({
			orderBy: { priority: "asc" },
		});

		return NextResponse.json(types);
	} catch (error) {
		console.error("GET /partner-types error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partner types" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = PartnerTypeSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const type = await prisma.partnerType.create({
			data: parsed.data,
		});

		return NextResponse.json(type, { status: 201 });
	} catch (error) {
		console.error("POST /partner-types error:", error);
		return NextResponse.json(
			{ error: "Failed to create partner type" },
			{ status: 500 },
		);
	}
}

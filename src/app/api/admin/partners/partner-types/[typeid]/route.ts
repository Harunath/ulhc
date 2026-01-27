import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const UpdatePartnerTypeSchema = z.object({
	name: z.string().min(2).optional(),
	slug: z.string().min(2).optional(),
	isActive: z.boolean().optional(),
	priority: z.number().int().optional(),
});

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ typeid: string }> },
) {
	try {
		const type = await prisma.partnerType.findUnique({
			where: { id: (await params).typeid },
		});

		if (!type) {
			return NextResponse.json(
				{ error: "Partner type not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(type);
	} catch (error) {
		console.error("GET /partner-types/[typeid] error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partner type" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ typeid: string }> },
) {
	try {
		const body = await req.json();
		const parsed = UpdatePartnerTypeSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const type = await prisma.partnerType.update({
			where: { id: (await params).typeid },
			data: parsed.data,
		});

		return NextResponse.json(type);
	} catch (error) {
		console.error("PUT /partner-types/[typeid] error:", error);
		return NextResponse.json(
			{ error: "Failed to update partner type" },
			{ status: 500 },
		);
	}
}

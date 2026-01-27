import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const UpdatePartnerCategorySchema = z.object({
	name: z.string().min(2).optional(),
	slug: z.string().min(2).optional(),
	isActive: z.boolean().optional(),
	priority: z.number().int().optional(),
});

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ categoryId: string }> },
) {
	try {
		const category = await prisma.partnerCategory.findUnique({
			where: { id: (await params).categoryId },
		});

		if (!category) {
			return NextResponse.json(
				{ error: "Partner category not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(category);
	} catch (error) {
		console.error("GET /partner-categories/[categoryId] error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partner category" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ categoryId: string }> },
) {
	try {
		const body = await req.json();
		const parsed = UpdatePartnerCategorySchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const category = await prisma.partnerCategory.update({
			where: { id: (await params).categoryId },
			data: parsed.data,
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error("PUT /partner-categories/[categoryId] error:", error);
		return NextResponse.json(
			{ error: "Failed to update partner category" },
			{ status: 500 },
		);
	}
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const PartnerCategorySchema = z.object({
	name: z.string().min(2),
	slug: z.string().min(2),
	isActive: z.boolean().optional().default(true),
	priority: z.number().int().optional().default(0),
});

export async function GET() {
	try {
		const categories = await prisma.partnerCategory.findMany({
			orderBy: { priority: "asc" },
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.error("GET /partner-categories error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partner categories" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = PartnerCategorySchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const category = await prisma.partnerCategory.create({
			data: parsed.data,
		});

		return NextResponse.json(category, { status: 201 });
	} catch (error) {
		console.error("POST /partner-categories error:", error);
		return NextResponse.json(
			{ error: "Failed to create partner category" },
			{ status: 500 },
		);
	}
}

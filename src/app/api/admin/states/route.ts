import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const StateSchema = z.object({
	name: z.string().min(2),
	code: z.string().optional().nullable(),
	isActive: z.boolean().optional().default(true),
	priority: z.number().int().optional().default(0),
});

export async function GET() {
	try {
		const states = await prisma.state.findMany({
			orderBy: { priority: "asc" },
		});
		return NextResponse.json(states);
	} catch (error) {
		console.error("GET /states error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partner" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = StateSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const state = await prisma.state.create({
			data: parsed.data,
		});

		return NextResponse.json(state, { status: 201 });
	} catch (error) {
		console.error("POST /states error:", error);
		return NextResponse.json(
			{ error: "Failed to create partner" },
			{ status: 500 },
		);
	}
}

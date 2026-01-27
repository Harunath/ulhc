import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const UpdateStateSchema = z.object({
	name: z.string().min(2).optional(),
	code: z.string().optional().nullable(),
	isActive: z.boolean().optional(),
	priority: z.number().int().optional(),
});

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ stateid: string }> },
) {
	try {
		const state = await prisma.state.findUnique({
			where: { id: (await params).stateid },
		});

		if (!state) {
			return NextResponse.json({ error: "State not found" }, { status: 404 });
		}

		return NextResponse.json(state);
	} catch (error) {
		console.error("GET /states/[stateid] error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch state" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ stateid: string }> },
) {
	try {
		const body = await req.json();
		const parsed = UpdateStateSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const state = await prisma.state.update({
			where: { id: (await params).stateid },
			data: parsed.data,
		});

		return NextResponse.json(state);
	} catch (error) {
		console.error("PUT /states/[stateid] error:", error);
		return NextResponse.json(
			{ error: "Failed to update state" },
			{ status: 500 },
		);
	}
}

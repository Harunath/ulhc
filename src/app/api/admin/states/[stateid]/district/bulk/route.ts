import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

/* ---------------- Schema ---------------- */

const DistrictSchema = z.object({
	name: z.string().min(2),
	code: z.string().optional().nullable(),
	priority: z.number().int().min(0),
	isActive: z.boolean(),
});

const BulkDistrictSchema = z.array(DistrictSchema);

/* ---------------- POST ---------------- */

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ stateid: string }> },
) {
	try {
		console.log("BULK DISTRICT CREATE REQUEST RECEIVED");
		const { stateid: stateId } = await params;

		if (!stateId) {
			return NextResponse.json(
				{ error: "State ID is required" },
				{ status: 400 },
			);
		}
		console.log("STATE ID:", stateId);
		const body = await req.json();
		const parsed = BulkDistrictSchema.safeParse(body);
		console.log("PARSED DATA:", parsed);
		if (!parsed.success) {
			return NextResponse.json(
				{ error: parsed.error.format() },
				{ status: 400 },
			);
		}

		/* ---------------- Ensure State Exists ---------------- */

		const stateExists = await prisma.state.findUnique({
			where: { id: stateId },
			select: { id: true },
		});

		if (!stateExists) {
			return NextResponse.json({ error: "State not found" }, { status: 404 });
		}

		/* ---------------- Prepare Data ---------------- */

		const districtsData = parsed.data.map((district) => ({
			...district,
			stateId: stateId,
		}));

		/* ---------------- Bulk Insert ---------------- */

		await prisma.district.createMany({
			data: districtsData,
			skipDuplicates: true, // avoids crashes if unique constraint exists
		});

		return NextResponse.json(
			{
				message: "Districts created successfully",
				count: districtsData.length,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("BULK DISTRICT CREATE ERROR:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

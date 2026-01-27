import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const UpdateDistrictSchema = z.object({
	name: z.string().min(2).optional(),
	code: z.string().optional().nullable(),
	isActive: z.boolean().optional(),
	priority: z.number().int().optional(),
});

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ stateid: string; districtid: string }> },
) {
	try {
		const district = await prisma.district.findFirst({
			where: {
				id: (await params).districtid,
				stateId: (await params).stateid,
			},
		});

		if (!district) {
			return NextResponse.json(
				{ error: "District not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(district);
	} catch (error) {
		console.error("GET /states/[stateid]/district/[districtid] error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch district" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ districtid: string }> },
) {
	try {
		const body = await req.json();
		const parsed = UpdateDistrictSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const district = await prisma.district.update({
			where: { id: (await params).districtid },
			data: parsed.data,
		});

		return NextResponse.json(district);
	} catch (error) {
		console.error("PUT /states/[stateid]/district/[districtid] error:", error);
		return NextResponse.json(
			{ error: "Failed to update district" },
			{ status: 500 },
		);
	}
}

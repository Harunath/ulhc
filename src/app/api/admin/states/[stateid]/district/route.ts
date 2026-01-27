import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ stateid: string }> },
) {
	try {
		const districts = await prisma.district.findMany({
			where: { stateId: (await params).stateid },
			orderBy: { priority: "asc" },
		});

		return NextResponse.json(districts);
	} catch (error) {
		console.error("GET /states/[stateid]/district error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch district" },
			{ status: 500 },
		);
	}
}

const BulkDistrictSchema = z.object({
	districts: z
		.array(
			z.object({
				name: z.string().min(2),
				code: z.string().optional().nullable(),
				priority: z.number().int().min(0).default(0),
				isActive: z.boolean().default(true),
			}),
		)
		.min(1),
});

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ stateid: string }> },
) {
	try {
		const body = await req.json();
		const parsed = BulkDistrictSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const stateid = (await params).stateid;

		await prisma.district.createMany({
			data: parsed.data.districts.map((d) => ({
				...d,
				stateId: stateid,
			})),
			skipDuplicates: true,
		});

		return NextResponse.json(
			{ message: "Districts created successfully" },
			{ status: 201 },
		);
	} catch (error) {
		console.error("POST /states/[stateid]/district error:", error);
		return NextResponse.json(
			{ error: "Failed to create districts" },
			{ status: 500 },
		);
	}
}

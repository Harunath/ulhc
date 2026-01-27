import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PartnerSchema } from "@/lib/types/Partner";
export const runtime = "nodejs";

export async function GET() {
	try {
		const partners = await prisma.partner.findMany({
			include: {
				category: true,
				type: true,
				state: true,
				district: true,
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(partners);
	} catch (error) {
		console.error("GET /partners error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partners" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = PartnerSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const { categoryId, typeId, stateId, districtId } = parsed.data;

		const [category, type, state, district] = await Promise.all([
			prisma.partnerCategory.findUnique({ where: { id: categoryId } }),
			prisma.partnerType.findUnique({ where: { id: typeId } }),
			prisma.state.findUnique({ where: { id: stateId } }),
			prisma.district.findFirst({
				where: { id: districtId, stateId },
			}),
		]);

		if (!category) {
			return NextResponse.json({ error: "Invalid category" }, { status: 400 });
		}
		if (!type) {
			return NextResponse.json(
				{ error: "Invalid partner type" },
				{ status: 400 },
			);
		}
		if (!state) {
			return NextResponse.json({ error: "Invalid state" }, { status: 400 });
		}
		if (!district) {
			return NextResponse.json(
				{ error: "District does not belong to state" },
				{ status: 400 },
			);
		}

		const partner = await prisma.partner.create({
			data: parsed.data,
		});

		return NextResponse.json(partner, { status: 201 });
	} catch (error) {
		console.error("POST /partners error:", error);
		return NextResponse.json(
			{ error: "Failed to create partner" },
			{ status: 500 },
		);
	}
}

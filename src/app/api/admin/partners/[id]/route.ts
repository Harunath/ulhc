import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const UpdatePartnerSchema = z.object({
	name: z.string().min(2).optional(),

	categoryId: z.uuid().optional(),
	typeId: z.uuid().optional(),

	stateId: z.uuid().optional(),
	districtId: z.uuid().optional(),
	address: z.string().min(5).optional(),
	logoUrl: z.url().nullable().optional(),

	isActive: z.boolean().optional(),
});

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		if (!(await params)?.id) {
			return NextResponse.json(
				{ error: "Partner ID is required" },
				{ status: 400 },
			);
		}

		const partner = await prisma.partner.findUnique({
			where: { id: (await params).id },
			include: {
				category: true,
				type: true,
				state: true,
				district: true,
			},
		});

		if (!partner) {
			return NextResponse.json({ error: "Partner not found" }, { status: 404 });
		}

		return NextResponse.json(partner);
	} catch (error) {
		console.error("GET /partners/[id] error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch partner" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		if (!(await params)?.id) {
			return NextResponse.json(
				{ error: "Partner ID is required" },
				{ status: 400 },
			);
		}

		const body = await req.json();
		const parsed = UpdatePartnerSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(parsed.error.format(), { status: 400 });
		}

		const updateData = Object.fromEntries(
			Object.entries(parsed.data).filter(
				([_, value]) => value !== undefined && value !== "" && value !== null,
			),
		);

		if (
			typeof updateData.stateId === "string" &&
			typeof updateData.districtId === "string"
		) {
			const district = await prisma.district.findFirst({
				where: {
					id: updateData.districtId,
					stateId: updateData.stateId,
				},
			});

			if (!district) {
				return NextResponse.json(
					{ error: "District does not belong to selected state" },
					{ status: 400 },
				);
			}
		}

		const partner = await prisma.partner.update({
			where: { id: (await params).id },
			data: updateData,
		});

		return NextResponse.json(partner);
	} catch (error) {
		console.error("PUT /partners/[id] error:", error);
		return NextResponse.json(
			{ error: "Failed to update partner" },
			{ status: 500 },
		);
	}
}

/* ---------------- DELETE (OPTIONAL) ---------------- */

// export async function DELETE(
// 	_req: Request,
// 	{ params }: { params: { id: string } },
// ) {
// 	try {
// 		if (!params?.id) {
// 			return NextResponse.json(
// 				{ error: "Partner ID is required" },
// 				{ status: 400 },
// 			);
// 		}

// 		await prisma.partner.delete({
// 			where: { id: params.id },
// 		});

// 		return NextResponse.json({ success: true });
// 	} catch (error) {
// 		console.error("DELETE /partners/[id] error:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to delete partner" },
// 			{ status: 500 },
// 		);
// 	}
// };

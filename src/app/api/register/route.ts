import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { Gender, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const RegisterSchema = z.object({
	email: z.email(),
	name: z.string().min(1).trim(),
	phone: z
		.string()
		.trim()
		.min(10)
		.max(15)
		.regex(/^\+?\d{10,15}$/, "Phone must be digits, optional +"),
	dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
	gender: z.enum(["Male", "Female", "Others"]),
	aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
	vrkpId: z.string().min(1).trim(),
	address: z.string().min(1).trim(),
	city: z.string().min(1).trim(),
	state: z.string().min(1).trim(),
	pincode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits"),
	meta: z.string(),
});

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		console.log("Registration input received:", body);
		const parsed = RegisterSchema.safeParse(body);
		console.log("Registration input parsed:", parsed);
		if (!parsed.success) {
			console.error("Registration input validation failed:", parsed.error);
			return NextResponse.json(
				{ ok: false, error: "invalid_input", details: parsed.error },
				{ status: 400 }
			);
		}
		const member = await prisma.$transaction(async (tx) => {
			const program = await tx.program.findMany();
			const programId = program[0]?.id;
			if (!programId) {
				throw new Error("Program not found");
			}

			const member = await tx.member.create({
				data: {
					vrkpId: parsed.data.vrkpId,
					fullname: parsed.data.name,
					email: parsed.data.email,
					phone: parsed.data.phone,
					dob: new Date(parsed.data.dob),
					gender: parsed.data.gender as Gender,
					aadhaar: parsed.data.aadhaar,
					address: parsed.data.address,
					city: parsed.data.city,
					state: parsed.data.state,
					pincode: parsed.data.pincode,
					programId: programId,
					programsExpireAt: new Date(
						new Date().setFullYear(new Date().getFullYear() + 3)
					),
				},
			});
			if (!member) {
				throw new Error("Member creation failed");
			}
			await tx.healthRecord.create({
				data: {
					memberId: member.id,
					data: parsed.data.meta ?? {},
					date: new Date(),
				},
			});
			return member;
		});
		const sendEmail = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/integrations/email`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: member.email,
					name: member.fullname,
					dob: member.dob.getDate(),
					aadhaar: member.aadhaar,
					address: member.address,
					vrkpId: member.vrkpId,
					activationDate: member.programsStartedAt.getDate(),
					expireDate: member.programsExpireAt.getDate(),
				}),
			}
		);
		console.log("Sent registration email, response status:", sendEmail.status);
		return NextResponse.json({ ok: true, memberId: member.id });
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ ok: false, error: "internal_error" },
			{ status: 500 }
		);
	}
};

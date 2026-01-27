import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma, Role } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const { name, email, phone, password } = await req.json();

		if (!name || !email || !phone || !password) {
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });
		}

		const adminCount = await prisma.admin.count();
		if (adminCount > 0) {
			return NextResponse.json(
				{ error: "Admin already exists" },
				{ status: 403 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const admin = await prisma.admin.create({
			data: {
				name,
				email,
				phone,
				password: hashedPassword,
				role: Role.ADMIN,
			},
		});

		return NextResponse.json({
			email: admin.email,
			message: "Admin created successfully",
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

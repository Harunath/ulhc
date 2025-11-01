import { SendActivationMail } from "@/lib/email/Activation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		console.log("Email integration received data:", body);
		if (!body.email || !body.name) {
			return NextResponse.json(
				{ ok: false, error: "invalid_input" },
				{ status: 400 }
			);
		}
		const url = process.env.EMAIL_API_URL as string;
		const token = process.env.EMAIL_TOKEN as string;

		await SendActivationMail({
			token,
			url,
			email: body.email,
			name: body.name,
			dob: body.dob,
			aadhaar: body.aadhaar,
			address: body.address,
			vrkpId: body.vrkpId,
			activationDate: body.activationDate,
			expireDate: body.expireDate,
		});
		// Here you would typically process the email data,
		// e.g., store it in the database, trigger other actions, etc.
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Email integration error:", error);
		return NextResponse.json(
			{ ok: false, error: "internal_error" },
			{ status: 500 }
		);
	}
};

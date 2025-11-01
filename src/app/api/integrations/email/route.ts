import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		console.log("Email integration received data:", body);
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

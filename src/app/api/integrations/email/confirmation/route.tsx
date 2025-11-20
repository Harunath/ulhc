// app/api/email/ulhc/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendMailClient } from "zeptomail";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { ULHCRegistrationLetterPdf } from "@/components/ULHCRegistrationLetter";

export const runtime = "nodejs";

const prisma = new PrismaClient();

type MergeInfo = {
	name: string;
	dob: string;
	aadhaar: string;
	address: string;
	vrkpId: string;
	activationDate: string;
	expireDate: string;
	year: string | number;
};

type Body = {
	to: {
		address: string;
		name?: string;
	};
	from?: {
		address: string;
		name?: string;
	};
	bounce_address?: string;
	merge_info: MergeInfo;
};

export async function POST(req: NextRequest) {
	try {
		const { to, from, bounce_address, merge_info } = (await req.json()) as Body;

		if (!to?.address) {
			return NextResponse.json(
				{ ok: false, error: "missing_to_address" },
				{ status: 400 }
			);
		}
		if (!merge_info?.name) {
			return NextResponse.json(
				{ ok: false, error: "missing_merge_info_name" },
				{ status: 400 }
			);
		}

		const API_URL = process.env.EMAIL_API_URL;
		const TOKEN = process.env.EMAIL_TOKEN;
		const TEMPLATE_KEY = process.env.EMAIL_TEMPLATE_KEY;

		if (!API_URL || !TOKEN || !TEMPLATE_KEY) {
			return NextResponse.json(
				{ ok: false, error: "missing_email_env_vars" },
				{ status: 500 }
			);
		}

		// Zepto base URL for template send
		const url = `${API_URL.replace(/\/$/, "")}/template`;
		const client = new SendMailClient({ url, token: TOKEN });

		// Prepare props for the PDF component
		const pdfProps = {
			name: merge_info.name,
			dob: merge_info.dob,
			aadhaar: merge_info.aadhaar,
			address: merge_info.address,
			vrkpId: merge_info.vrkpId,
			activationDate: merge_info.activationDate,
			expireDate: merge_info.expireDate,
			year: String(merge_info.year),
		};

		const pdfUint8Array = await renderToBuffer(
			<ULHCRegistrationLetterPdf {...pdfProps} />
		);

		// Ensure we have a Node Buffer before base64
		const pdfBuffer = Buffer.isBuffer(pdfUint8Array)
			? pdfUint8Array
			: Buffer.from(pdfUint8Array);

		const pdfBase64 = pdfBuffer.toString("base64");

		// ---------- Send mail with ZeptoMail template + attachment ----------
		const res = await client.sendMailWithTemplate({
			mail_template_key: TEMPLATE_KEY,
			from: {
				address: from?.address ?? "noreply@unitylifehealthcare.com",
				name: from?.name ?? "Unity Life Health Care",
			},
			to: [
				{
					email_address: {
						address: to.address,
						name: to.name,
					},
				},
			],
			merge_info, // used inside ZeptoMail HTML template
			attachments: [
				{
					name: `ULHC_Registration_${merge_info.vrkpId}.pdf`,
					mime_type: "application/pdf",
					content: pdfBase64,
				},
			],
		});

		console.log("ZeptoMail res:", res);
		const { message } = res as { message?: string };

		if (message && message === "OK") {
			await prisma.emailLog.create({
				data: {
					templateKey: TEMPLATE_KEY,
					toAddress: to.address,
					fromAddress: from?.address,
					bounceAddress: bounce_address,
					mergeInfo: merge_info,
					responseStatus: 200,
					responseData: res as object,
					isDelivered: true,
					tag: "ULHC_REGISTRATION",
				},
			});

			return NextResponse.json(
				{ ok: true, status: 200, data: res },
				{ status: 200 }
			);
		} else {
			console.error("ZeptoMail send error:", message);

			await prisma.emailLog.create({
				data: {
					templateKey: TEMPLATE_KEY,
					toAddress: to.address,
					fromAddress: from?.address,
					bounceAddress: bounce_address,
					mergeInfo: merge_info,
					responseStatus: 500,
					responseData: message ?? "UNKNOWN_ERROR",
					isDelivered: false,
					tag: "ULHC_REGISTRATION",
				},
			});

			return NextResponse.json(
				{ ok: false, error: "email_send_failed", details: message },
				{ status: 500 }
			);
		}
	} catch (err) {
		console.error("Error in ULHC email route:", err);

		return NextResponse.json(
			{
				ok: false,
				error: "server_error",
				details: err instanceof Error ? err.message : String(err),
			},
			{ status: 500 }
		);
	}
}

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendMailClient } from "zeptomail";
const prisma = new PrismaClient();

type MergeInfo = {
	name: string;
	dob: string; // ISO or readable string, your template prints it as-is
	aadhaar: string;
	address: string; // full string; if your template slices, keep as full here
	vrkpId: string;
	activationDate: string;
	expireDate: string;
};

type Body = {
	to: {
		address: string; // single recipient email
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

		// ZeptoMail template endpoint = EMAIL_API_URL + "/template"
		const url = `${API_URL.replace(/\/$/, "")}/template`;

		// Build Zepto payload (single recipient, template-based)
		// const payload = {
		// 	template_key: TEMPLATE_KEY,
		// 	from: from ?? {
		// 		address: "no-reply@unitylifehealthcare.com",
		// 		name: "Unity Life Health Care",
		// 	},
		// 	bounce_address: bounce_address ?? "bounce@bounce.unitylifehealthcare.com",
		// 	to: [
		// 		{
		// 			email_address: {
		// 				address: to.address,
		// 				name: to.name ?? merge_info.name,
		// 			},
		// 		},
		// 	],
		// 	merge_info,
		// };

		// const res = await fetch(url, {
		// 	method: "POST",
		// 	headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json",
		// 		Authorization: `Zoho-enczapikey ${TOKEN}`,
		// 	},
		// 	body: JSON.stringify(payload),
		// });

		const client = new SendMailClient({ url, token: TOKEN });

		client
			.sendMailWithTemplate({
				mail_template_key: TEMPLATE_KEY,
				from: {
					address: "noreply@unitylifehealthcare.com",
					name: "Unity Life Health Care",
				},
				to: [
					{
						email_address: {
							address: to.address,
							name: to.name,
						},
					},
				],
				merge_info: merge_info,
			})
			.then(async (res: unknown) => {
				console.log(res);
				await prisma.emailLog.create({
					data: {
						templateKey: process.env.EMAIL_TEMPLATE_KEY!,
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
			})
			.catch(async (error: unknown) => {
				console.error("ZeptoMail send error:", error);
				await prisma.emailLog.create({
					data: {
						templateKey: process.env.EMAIL_TEMPLATE_KEY!,
						toAddress: to.address,
						fromAddress: from?.address,
						bounceAddress: bounce_address,
						mergeInfo: merge_info,
						responseStatus: 500,
						responseData: error as object,
						isDelivered: false,
						tag: "ULHC_REGISTRATION",
					},
				});
				return NextResponse.json(
					{ ok: false, error: "email_send_failed", details: String(error) },
					{ status: 500 }
				);
			});
	} catch (err) {
		console.error("Error in email confirmation route:", err);
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

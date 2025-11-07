import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendMailClient } from "zeptomail";
import { console } from "inspector";
const prisma = new PrismaClient();

export async function POST() {
	try {
		console.log("Fetching members...");
		const member = await prisma.member.findMany();
		console.log(`Found ${member.length} members.`);
		for (const m of member) {
			console.log("Member name : ", m.fullname, " Sending email to: ", m.email);
			const to = {
				address: m.email,
				name: m.fullname,
			};
			const merge_info = {
				name: m.fullname,
				dob: m.dob.toISOString().split("T")[0],
				aadhaar: m.aadhaar,
				address:
					m.address.length > 20 ? `${m.address.slice(0, 20)}...` : m.address,
				vrkpId: m.vrkpId,
				activationDate: new Date().toISOString().split("T")[0],
				expireDate: new Date(
					new Date().setFullYear(new Date().getFullYear() + 1)
				)
					.toISOString()
					.split("T")[0],
			};
			const from = {
				address: "noreply@unitylifehealthcare.com",
				name: "Unity Life Health Care",
			};
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
				console.log("Missing email env vars");
				return NextResponse.json(
					{ ok: false, error: "missing_email_env_vars" },
					{ status: 500 }
				);
			}

			const url = `${API_URL.replace(/\/$/, "")}/template`;

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
							mergeInfo: merge_info,
							responseStatus: 200,
							responseData: res as object,
							isDelivered: true,
							tag: "ULHC_REGISTRATION",
						},
					});
				})
				.catch(async (error: unknown) => {
					console.error("ZeptoMail send error:", error);
					await prisma.emailLog.create({
						data: {
							templateKey: process.env.EMAIL_TEMPLATE_KEY!,
							toAddress: to.address,
							fromAddress: from?.address,
							mergeInfo: merge_info,
							responseStatus: 500,
							responseData: error as object,
							isDelivered: false,
							tag: "ULHC_REGISTRATION",
						},
					});
				});
		}
		return NextResponse.json({ ok: true, status: 200 }, { status: 200 });
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

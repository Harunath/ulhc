import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendMailClient } from "zeptomail";
import puppeteer from "puppeteer";
import logo from "logo.png";

const prisma = new PrismaClient();

type MergeInfo = {
	name: string;
	dob: string; // ISO or readable string, your template prints it as-is
	aadhaar: string;
	address: string; // full string; if your template slices, keep as full here
	vrkpId: string;
	activationDate: string;
	expireDate: string;
	year: string | number;
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
		const filledHtml = fillTemplate(ulhcHtmlTemplate, {
			name: merge_info.name,
			dob: merge_info.dob,
			aadhaar: merge_info.aadhaar,
			address: merge_info.address,
			vrkpId: merge_info.vrkpId,
			activationDate: merge_info.activationDate,
			expireDate: merge_info.expireDate,
			year: String(merge_info.year ?? new Date().getFullYear()),
		});

		const client = new SendMailClient({ url, token: TOKEN });

		const pdfBuffer = await htmlToPdfBuffer(filledHtml);
		const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

		const response = await client.sendMailWithTemplate({
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
			merge_info, // for email body
			attachments: [
				{
					name: `ULHC_Registration_${merge_info.vrkpId}.pdf`,
					mime_type: "application/pdf",
					content: pdfBase64, // base64 string
				},
			],
		});
		console.log("ZeptoMail raw response:", response);

		const res = await response.json();
		console.log("ZeptoMail res:", res);

		const { message } = res;
		if (message && message == "OK") {
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
		} else {
			console.error("ZeptoMail send error:", message);
			await prisma.emailLog.create({
				data: {
					templateKey: process.env.EMAIL_TEMPLATE_KEY!,
					toAddress: to.address,
					fromAddress: from?.address,
					bounceAddress: bounce_address,
					mergeInfo: merge_info,
					responseStatus: 500,
					responseData: message,
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

const ulhcHtmlTemplate = `
<html>
 <head></head>
 <body>
  <div>
   <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;margin:40px auto;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
    <tbody>
     <tr>
      <td style="background-color:#86f4ff;padding:20px;text-align:center;color:#ffffff;">
       <h1 style="margin:0;font-size:24px;">
        <img src="https://res.cloudinary.com/degrggosz/image/upload/v1763016806/ULHC_Logo_PNG_1_gpbvmc.png" width="400" height="75.73560767590618">
        <span class="size" style="font-size: 14px; margin: 0px;">​</span> <br>
       </h1>
      </td>
     </tr>
     <tr>
      <td style="padding:30px;">
       <p><span style="color:#333333;font-size:15px">Dear {{name}},</span></p>
       <p style="line-height: 1.6;color:#555555;font-size:15px;">
        We are delighted to welcome you to the <b>Unity Life Health Care (ULHC)</b> family as part of the
        <b>VR Kisan Parivaar Membership Program</b>. Through this program, you can now access healthcare services
        across the ULHC empaneled hospital network. Your membership is valid for three years, and we look forward
        to supporting you on your journey toward better health and well-being.
       </p>
       <h3 style="margin-top:25px;margin-bottom:10px;color:#0077b6;">Your Registration Details:</h3>
       <table cellpadding="6" cellspacing="0" width="100%" style="font-size:14px;color:#333333;border-collapse:collapse;">
        <tbody>
         <tr><td><b>Member Name:</b></td><td>{{name}}</td></tr>
         <tr><td><b>Member DOB:</b></td><td>{{dob}}</td></tr>
         <tr><td><b>Aadhaar Number:</b></td><td>{{aadhaar}}</td></tr>
         <tr><td><b>Member Address:</b></td><td>{{address}}</td></tr>
         <tr><td><b>Member ID:</b></td><td>{{vrkpId}}</td></tr>
         <tr><td><b>Activation Date:</b></td><td>{{activationDate}}</td></tr>
         <tr><td><b>Valid Upto:</b></td><td>{{expireDate}}</td></tr>
        </tbody>
       </table>
       <p style="margin-top: 20px; line-height: 1.6;color:#555555;font-size:15px;">
        For any assistance or queries regarding your healthcare services, please reach out to us at:
       </p>
       <table cellpadding="4" cellspacing="0" width="100%" style="font-size:14px;color:#333333;">
        <tbody>
         <tr><td><b>Website:</b></td><td><a href="https://www.unitylifehealthcare.com/" style="color:#0077b6;">unitylifehealthcare.com</a></td></tr>
         <tr><td><b>Email:</b></td><td><a href="mailto:help@unitylifehealthcare.com" style="color:#0077b6;">help@unitylifehealthcare.com</a></td></tr>
        </tbody>
       </table>
       <p style="margin-top: 25px; line-height: 1.6;color:#555555;font-size:15px;">
        Thank you for choosing <b>ULHC</b>. We are committed to providing you with quality healthcare services with care and compassion.
       </p>
       <p style="margin-top: 20px;color:#333333;font-size:15px;">
        Warm regards,<br><b>Unity Life Health Care (ULHC)</b>
       </p>
      </td>
     </tr>
     <tr>
      <td style="background-color:#f1f3f5;text-align:center;padding:15px;font-size:12px;color:#666666;">
       © {{year}} Unity Life Health Care. All rights reserved.
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 </body>
</html>
`;

function fillTemplate(html: string, data: Record<string, string>) {
	let out = html;
	for (const [key, value] of Object.entries(data)) {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
		out = out.replace(regex, value ?? "");
	}
	return out;
}

async function htmlToPdfBuffer(html: string) {
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: "networkidle0" });
	const pdfBuffer = await page.pdf({
		format: "A4",
		printBackground: true,
	});
	await browser.close();
	return pdfBuffer;
}

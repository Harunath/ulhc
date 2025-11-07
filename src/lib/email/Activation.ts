import { SendMailClient } from "zeptomail";

export const SendActivationMail = async ({
	token,
	url,
	email,
	name,
	dob,
	aadhaar,
	address,
	vrkpId,
	activationDate,
	expireDate,
}: {
	token: string;
	url: string;
	email: string;
	name: string;
	dob: string;
	aadhaar: string;
	address: string;
	vrkpId: string;
	activationDate: string;
	expireDate: string;
}) => {
	const htmlBody = `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background-color:#f8f9fa;">
  <head>
    <meta charset="UTF-8" />
    <title>ULHC Registration Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f8f9fa;">
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;margin:40px auto;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="background-color:#0077b6;padding:20px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Unity Life Health Care (ULHC)</h1>
          <p style="margin:0;font-size:14px;">Your Health. Our Priority.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:30px;">
          <h2 style="color:#333333;">Registration Letter</h2>
          <p style="font-size:15px;color:#333333;">Dear <b>${name}</b>,</p>
          <p style="font-size:15px;color:#555555;line-height:1.6;">
            We are delighted to welcome you to the <b>Unity Life Health Care (ULHC)</b> family as part of the 
            <b>VR Kisan Parivaar Membership Program</b>. Through this program, you can now access healthcare 
            services across the ULHC empaneled hospital network. Your membership is valid for three years, and 
            we look forward to supporting you on your journey toward better health and well-being.
          </p>
          <h3 style="margin-top:25px;margin-bottom:10px;color:#0077b6;">Your Registration Details:</h3>
          <table cellpadding="6" cellspacing="0" width="100%" style="font-size:14px;color:#333333;border-collapse:collapse;">
            <tr><td><b>Member Name:</b></td><td>${name}</td></tr>
            <tr><td><b>Member DOB:</b></td><td>${dob}</td></tr>
            <tr><td><b>Aadhaar Number:</b></td><td>${aadhaar}</td></tr>
            <tr><td><b>Member Address:</b></td><td>${address.slice(0, 20)}</tr>
            <tr><td><b>Member ID:</b></td><td>${vrkpId}</td></tr>
            <tr><td><b>Activation Date:</b></td>${activationDate}<td></td></tr>
            <tr><td><b>Valid Upto:</b></td><td>${expireDate}</td></tr>
          </table>
          <p style="margin-top:20px;font-size:15px;color:#555555;line-height:1.6;">
            For any assistance or queries regarding your healthcare services, please reach out to us at:
          </p>
          <table cellpadding="4" cellspacing="0" width="100%" style="font-size:14px;color:#333333;">
            <tr><td><b>Website:</b></td><td><a href="https://www.unitylifehealthcare.com/" style="color:#0077b6;">unitylifehealthcare.com</a></td></tr>
            <tr><td><b>Email:</b></td><td><a href="mailto: help@unitylifehealthcare.com" style="color:#0077b6;">help@unitylifehealthcare.com</a></td></tr>
          </table>
          <p style="margin-top:25px;font-size:15px;color:#555555;line-height:1.6;">
            Thank you for choosing <b>ULHC</b>. We are committed to providing you with quality healthcare services with care and compassion.
          </p>
          <p style="margin-top:20px;font-size:15px;color:#333333;">Warm regards,<br/><b>Unity Life Health Care (ULHC)</b></p>
        </td>
      </tr>
      <tr>
        <td style="background-color:#f1f3f5;text-align:center;padding:15px;font-size:12px;color:#666666;">
          © ${new Date().getFullYear()} Unity Life Health Care. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>`;

	const client = new SendMailClient({ url, token });

	client
		.sendMail({
			from: {
				address: "help@unitylifehealthcare.com",
				name: "noreply",
			},
			to: [
				{
					email_address: {
						address: `${email}`,
						name: `${name}`,
					},
				},
			],
			subject: "Unity Life Healthcare Program Activation",
			htmlbody: htmlBody,
		})
		.then((resp) => {
			console.log("success");
			return resp;
		})
		.catch((error) => {
			console.log("error");
			return error;
		});
};

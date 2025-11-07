"use client";
import React from "react";

const SendMailEveryone = () => {
	const handleSendMail = async () => {
		try {
			const response = await fetch("/api/integrations/email/everyone", {
				method: "POST",
			});

			const data = await response.json();
			console.log("Email send response:", data);
		} catch (error) {
			console.error("Error sending email to everyone:", error);
		}
	};

	return (
		<div>
			<h1 className=" text-2xl font-bold">Send Mail to Everyone</h1>
			<button onClick={handleSendMail} className=" p-2 mt-4 bg-blue-300 ">
				Send Mail
			</button>
		</div>
	);
};

export default SendMailEveryone;

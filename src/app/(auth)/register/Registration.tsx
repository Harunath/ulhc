"use client";
import HealthDeclarationForm from "@/components/Forms/HealthDeclarationForm";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Registration = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	console.log("URL params in Registration component:", searchParams);
	const [error, setError] = React.useState<string | null>(null);
	const [data, setData] = React.useState<{
		vrkpId: string;
		name: string;
		email: string;
		phone: string;
		dob: string;
		gender: string;
		aadhaar: string;
	}>({
		vrkpId: "",
		name: "",
		email: "",
		phone: "",
		dob: "",
		gender: "",
		aadhaar: "",
	});
	useEffect(() => {
		console.log("Token from URL params:", token);
		if (token) {
			// Fetch prefill data using the token
			fetch(
				`/api/register/prefill?token=${encodeURIComponent(token as string)}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.ok) {
						// Use data.prefill to prefill the form
						setData(data.prefill);
					} else {
						setError(data.error || "Failed to fetch prefill data");
					}
				});
		}
	}, [token]);
	return (
		<div>
			{data.vrkpId ? (
				<HealthDeclarationForm
					memberInfo={{
						...data,
						mobile: data.phone,
						aadhar: data.aadhaar,
					}}
				/>
			) : (
				<>{error ? <p>Error: {error}</p> : <p>Loading...</p>}</>
			)}
		</div>
	);
};

export default Registration;

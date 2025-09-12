import AboutUlhc from "@/components/About/AboutUlhc";
import HospitalValueProposition from "@/components/About/HospitalValueProposition";
import Join from "@/components/About/Join";
import Mission from "@/components/About/Mission";
import Values from "@/components/About/Values";
import Vision from "@/components/About/Vision";
import WhyUs from "@/components/About/WhyUs";
import React from "react";

function page() {
	return (
		<>
			<AboutUlhc />
			<HospitalValueProposition/>
			<Mission />
			<Vision />
			<Values />
			<WhyUs />
			<Join />
		</>
	);
}

export default page;

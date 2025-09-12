import AboutUlhc from "@/components/About/AboutUlhc";
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
			<Mission />
			<Vision />
			<Values />
			<WhyUs />
			<Join />
		</>
	);
}

export default page;

import KeyBenefits from "@/components/hcp/KeyBenefits";
import Purpose from "@/components/hcp/Purpose";
import Highlights from "@/components/hcp/Highlights";
import React from "react";

function page() {
	return (
		<>
			<Purpose />
			<KeyBenefits audience="hospital" />
			<Highlights />
		</>
	);
}

export default page;

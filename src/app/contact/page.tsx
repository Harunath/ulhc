import ContactHeader from "@/components/contact/ContactSection";
import HospitalSupportCard from "@/components/contact/HospitalSupportCard";
import MemberSupportCard from "@/components/contact/MemberSupportCard";
import NextStep from "@/components/contact/NextStep";

function page() {
	return (
		<>
			<ContactHeader />
			<MemberSupportCard />
			<HospitalSupportCard />
			<NextStep />
		</>
	);
}

export default page;

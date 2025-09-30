import ContactHeader from "@/components/contact/ContactSection";
import HospitalSupportCard from "@/components/contact/HospitalSupportCard";
import MemberSupportCard from "@/components/contact/MemberSupportCard";

function page() {
	return (
		<>
			<ContactHeader />
			<MemberSupportCard />
			<HospitalSupportCard />
		</>
	);
}

export default page;

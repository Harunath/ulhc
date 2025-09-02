import Carousel from "@/components/Home/Carousel";
import AboutIntro from "@/components/Home/AboutIntro";
import HcpHighlights from "@/components/Home/HCPHighlights";
import HowItWorks from "@/components/Home/HowItWorks";
import Testimonials from "@/components/Home/Testimonials";
import Partners from "@/components/Home/Partners";
import Cta from "@/components/Home/CTA";

function page() {
	return (
		<>
			<Carousel />
			<AboutIntro />
			<HcpHighlights />
			<HowItWorks />
			<Testimonials />
			<Partners />
			<Cta />
		</>
	);
}

export default page;

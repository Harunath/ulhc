import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function StaticLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen ">
			<Navbar />
			<main className=" ">{children}</main>
			<Footer />
		</div>
	);
}

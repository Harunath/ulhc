"use client";

import {
	FaHospital,
	FaWallet,
	FaClipboardCheck,
	FaUsers,
	FaFileContract,
	FaStethoscope,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const BRAND = "#045e5a";

const hospitalValues = [
	{
		key: "inflow",
		title: "Steady Patient Inflow",
		desc: "Predictable referrals via VR Kisan Parivaar (VRKP) members.",
		Icon: FaUsers,
	},
	{
		key: "benefit",
		title: "₹25,000 Fixed Surgical Benefit",
		desc: "Prompt payment after patient approval ensures financial clarity.",
		Icon: FaWallet,
	},
	{
		key: "process",
		title: "Simplified Process",
		desc: "ULHC manages pre-authorization and member coordination end-to-end.",
		Icon: FaClipboardCheck,
	},
	{
		key: "trust",
		title: "Enhanced Trust & Visibility",
		desc: "Gain credibility within the VRKP community as a trusted partner.",
		Icon: FaHospital,
	},
	{
		key: "agreement",
		title: "Simple Empanelment Agreement",
		desc: "Clear, quick onboarding with dedicated support.",
		Icon: FaFileContract,
	},
	{
		key: "access",
		title: "Immediate Access",
		desc: "Directly reach the VRKP member base for treatments and surgeries.",
		Icon: FaStethoscope,
	},
];

export default function HospitalValueProposition() {
	return (
		<section className="py-16 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				{/* Section Heading */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
						Value Proposition for{" "}
						<span style={{ color: BRAND }}>Hospitals</span>
					</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						ULHC offers hospitals a win–win partnership: affordable care for
						members, reliable revenue for healthcare providers.
					</p>
				</div>

				{/* Cards Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{hospitalValues.map((value, i) => (
						<motion.div
							key={value.key}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: i * 0.1 }}
							viewport={{ once: true }}
							className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition p-6">
							<div
								className="w-12 h-12 flex items-center justify-center rounded-xl mb-4"
								style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
								<value.Icon size={24} />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								{value.title}
							</h3>
							<p className="text-gray-600 text-sm leading-relaxed">
								{value.desc}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

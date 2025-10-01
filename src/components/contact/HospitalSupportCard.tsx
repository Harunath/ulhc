"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
	FiHome,
	FiClipboard,
	FiTrendingUp,
	FiCheckCircle,
	FiArrowRight,
} from "react-icons/fi";

const BRAND = "#045e5a";

export default function HospitalSupportCard() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 14 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.4 }}
			className="w-full">
			<div className="mx-auto my-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8 md:p-10">
				{/* Top row */}
				<div className="flex items-center gap-3">
					<span
						className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
						style={{ backgroundColor: `${BRAND}14`, color: BRAND }}>
						<FiHome className="h-5 w-5" />
					</span>
					<span
						className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white"
						style={{ backgroundColor: BRAND }}>
						For Hospitals / Service Providers
					</span>
				</div>

				{/* Title + copy */}
				<h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
					Partner with <span style={{ color: BRAND }}>ULHC</span> to serve
					members with confidence
				</h3>
				<p className="mt-3 text-base leading-7 text-slate-600 sm:text-[17px]">
					Want to join our partner network? Contact us to learn about the
					empanelment process and discover how your hospital can connect with
					ULHC members.
				</p>

				{/* Highlights */}
				<ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
					<Li icon={<FiClipboard className="h-3.5 w-3.5" />}>
						Simple onboarding & clear terms
					</Li>
					<Li icon={<FiCheckCircle className="h-3.5 w-3.5" />}>
						Support with approvals & documentation
					</Li>
					<Li icon={<FiTrendingUp className="h-3.5 w-3.5" />}>
						Consistent referrals from members
					</Li>
					<Li icon={<FiCheckCircle className="h-3.5 w-3.5" />}>
						Timely settlements on approved cases
					</Li>
				</ul>

				{/* Bottom accent */}
				<div className="mt-8 flex">
					<div
						className="h-1 w-16 rounded-full"
						style={{ backgroundColor: BRAND }}
					/>
				</div>
			</div>
		</motion.section>
	);
}

function Li({
	children,
	icon,
}: {
	children: React.ReactNode;
	icon: React.ReactNode;
}) {
	return (
		<li className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2">
			<span
				className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
				style={{ backgroundColor: `${BRAND}14`, color: BRAND }}>
				{icon}
			</span>
			<span className="text-sm text-slate-700">{children}</span>
		</li>
	);
}

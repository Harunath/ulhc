"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiPercent, FiUserCheck, FiPackage } from "react-icons/fi";
import { FaBed } from "react-icons/fa";

const items = [
	{
		title: "Pharmacy, Lab & Radiology Discounts",
		desc: "Save on essential diagnostics and medicines across our verified partner network.",
		icon: <FiPercent className="h-6 w-6 text-blue-600" />,
	},
	{
		title: "Free Second Medical Opinion",
		desc: "Consult approved specialists for a second opinion at no extra cost.",
		icon: <FiUserCheck className="h-6 w-6 text-blue-600" />,
	},
	{
		title: "In-Patient Benefits (up to 6 days)",
		desc: "Doctor’s fees, nursing, operation theatre, and general ward/bed benefits.",
		icon: <FaBed className="h-6 w-6 text-blue-600" />,
	},
	{
		title: "Help with Surgical Implants & Materials",
		desc: "Assistance sourcing authentic implants and materials for procedures.",
		icon: <FiPackage className="h-6 w-6 text-blue-600" />,
	},
];

export default function HcpHighlights() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
						Health Card Program
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						The Health Card Program (HCP)
					</h2>
					<p className="mt-3 text-slate-600">
						Your key to healthcare savings and trusted support across pharmacy,
						diagnostics, in-patient care, and more.
					</p>
				</div>

				{/* Cards */}
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
					{items.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
							className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
								{item.icon}
							</div>
							<h3 className="mt-4 text-base font-semibold text-slate-900">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-slate-600">
								{item.desc}
							</p>

							{/* subtle highlight bar */}
							<div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-blue-600 transition group-hover:scale-x-100" />
						</motion.div>
					))}
				</div>

				{/* CTA Row */}
				<div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						href="/hcp"
						className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
						Explore HCP Details
					</Link>
					<Link
						href="/join"
						className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50">
						Get Your Health Card
					</Link>
				</div>
			</div>

			{/* soft background accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(59,130,246,0.15), transparent)",
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(59,130,246,0.12), transparent)",
				}}
			/>
		</section>
	);
}

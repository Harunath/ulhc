"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiPercent, FiUserCheck, FiPackage } from "react-icons/fi";
// Note: FaBed was unused in your content, so I removed it to avoid dead imports.

const brand = "#045e5a";

const items = [
	{
		title: "Pharmacy, Lab & Radiology Discounts",
		desc: "Save on essential diagnostics and medicines across our verified partner network.",
		icon: <FiPercent className="h-6 w-6" style={{ color: brand }} />,
	},
	{
		title: "Free Second Medical Opinion",
		desc: "Consult approved specialists for a second opinion at no extra cost.",
		icon: <FiUserCheck className="h-6 w-6" style={{ color: brand }} />,
	},
	{
		title: "Help with Surgical Implants & Materials",
		desc: "Assistance sourcing authentic implants and materials for procedures.",
		icon: <FiPackage className="h-6 w-6" style={{ color: brand }} />,
	},
] as const;

export default function HcpHighlights() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span
						className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
						style={{
							color: brand,
							backgroundColor: `${brand}1A`, // ~10% opacity
							boxShadow: `inset 0 0 0 1px ${brand}33`,
						}}>
						Health Care Program
					</span>

					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						The Health Care Program (HCP)
					</h2>

					<p className="mt-3 text-slate-600">
						Your key to healthcare savings and trusted support across pharmacy,
						diagnostics, in-patient care, and more.
					</p>
				</div>

				{/* Cards */}
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
					{items.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
							className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md"
							tabIndex={0}>
							<div
								className="flex h-10 w-10 items-center justify-center rounded-lg ring-1"
								style={{
									backgroundColor: `${brand}1A`,
									boxShadow: `inset 0 0 0 1px ${brand}1A`,
									borderColor: `${brand}1A`,
								}}>
								{item.icon}
							</div>

							<h3 className="mt-4 text-base font-semibold text-slate-900">
								{item.title}
							</h3>

							<p className="mt-2 text-sm leading-relaxed text-slate-600">
								{item.desc}
							</p>

							{/* Focus/hover underline accent */}
							<span
								className="absolute inset-x-6 bottom-4 block h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus:scale-x-100"
								style={{ backgroundColor: brand }}
								aria-hidden
							/>
						</motion.div>
					))}
				</div>

				{/* CTA Row */}
				<div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						href="/hcp"
						className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2"
						style={{ backgroundColor: brand }}
						onMouseDown={(e) => e.currentTarget.classList.add("scale-[0.99]")}
						onMouseUp={(e) => e.currentTarget.classList.remove("scale-[0.99]")}>
						Explore HCP Details
					</Link>
				</div>
			</div>

			{/* soft background accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background: `radial-gradient(closest-side, ${brand}26, transparent)`,
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background: `radial-gradient(closest-side, ${brand}1F, transparent)`,
				}}
			/>
		</section>
	);
}

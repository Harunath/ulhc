"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
	FiTrendingUp,
	FiShield,
	FiUsers,
	FiHeart,
	FiArrowRight,
} from "react-icons/fi";

const BRAND = "#045e5a";

export default function WhyUs() {
	return (
		<section className="relative overflow-hidden bg-neutral-50">
			{/* Soft brand backdrop */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background: `radial-gradient(800px 300px at 15% 0%, ${BRAND}12, transparent 60%),
             radial-gradient(900px 360px at 100% 80%, ${BRAND}0f, transparent 65%)`,
				}}
			/>

			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-3xl text-center">
					<span
						className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
						style={{
							color: BRAND,
							backgroundColor: `${BRAND}1A`,
							boxShadow: `inset 0 0 0 1px ${BRAND}33`,
						}}>
						Why ULHC Matters
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Powering Community Health.
					</h2>
				</div>

				{/* Content grid */}
				<div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
					{/* Left: Narrative */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, ease: "easeOut" }}
						className="lg:col-span-7">
						{/* Problem statement card */}
						<div className="rounded-2xl border border-slate-200 bg-neutral-50 p-6 shadow-sm">
							<div className="flex items-start gap-4">
								<div
									className="flex h-11 w-11 items-center justify-center rounded-xl ring-1"
									style={{
										color: BRAND,
										backgroundColor: `${BRAND}14`,
										boxShadow: `inset 0 0 0 1px ${BRAND}1F`,
									}}>
									<FiTrendingUp className="h-5 w-5" />
								</div>
								<div>
									<h3 className="text-base font-semibold text-slate-900">
										The Challenge
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-slate-600">
										For too many families, healthcare feels out of reach—whether
										due to high costs, limited access, or lack of trusted
										services. ULHC was founded to close this gap and ensure care
										is available when it matters most.
									</p>
								</div>
							</div>
						</div>

						{/* Value highlights */}
						<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
							<Highlight
								icon={<FiShield className="h-5 w-5" />}
								title="Financial Protection"
								desc="Affordable care that reduces the burden of unexpected medical expenses."
							/>
							<Highlight
								icon={<FiUsers className="h-5 w-5" />}
								title="Trusted Network"
								desc="Empaneled hospitals and doctors committed to quality care."
							/>
							<Highlight
								icon={<FiHeart className="h-5 w-5" />}
								title="Compassionate Service"
								desc="Care delivered with empathy, dignity, and member-first focus."
							/>
							<Highlight
								icon={<FiArrowRight className="h-5 w-5" />}
								title="Efficient Access"
								desc="Streamlined pathways that ensure timely treatment without barriers."
							/>
						</div>
					</motion.div>

					{/* Right: Impact / Proof */}
					<motion.aside
						initial={{ opacity: 0, y: 22 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
						className="lg:col-span-5">
						<div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-neutral-50 p-6 shadow-sm">
							<div>
								<div className="text-xs font-medium uppercase tracking-wider text-slate-500">
									Community Impact
								</div>
								<div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200">
									{[
										{ value: "₹", label: "Lower Bills" },
										{ value: "24/7", label: "Support" },
										{ value: "500+", label: "Hospitals" },
									].map((s, idx) => (
										<div
											key={s.label}
											className={[
												"flex flex-col items-center justify-center p-4 text-center",
												idx === 1 ? "bg-[rgba(4,94,90,0.05)]" : "bg-neutral-50",
											].join(" ")}>
											<div
												className="text-xl sm:text-2xl font-bold leading-none"
												style={{ color: BRAND }}>
												{s.value}
											</div>
											<div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-slate-600">
												{s.label}
											</div>
										</div>
									))}
								</div>

								{/* Bullets */}
								<ul className="mt-6 space-y-3">
									{[
										"Efficient healthcare delivery through partnerships",
										"Affordable treatments with transparent terms",
										"Trusted hospitals serving members with dignity",
										"Extending care to underserved communities",
										"Reducing financial strain on families",
										"24/7 support for peace of mind",
										"Holistic healthcare that adapts to needs",
										"Long-term, sustainable benefits for members",
									].map((point) => (
										<li key={point} className="flex items-start gap-3 text-sm">
											<span
												className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
												style={{ backgroundColor: BRAND }}
											/>
											<span className="text-slate-700">{point}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.aside>
				</div>
			</div>
		</section>
	);
}

/* --------- Bits --------- */

function Highlight({
	icon,
	title,
	desc,
}: {
	icon: React.ReactNode;
	title: string;
	desc: string;
}) {
	return (
		<div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-neutral-50 p-4 shadow-sm transition hover:shadow-md">
			<div
				className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition"
				style={{
					color: BRAND,
					backgroundColor: `${BRAND}14`,
					boxShadow: `inset 0 0 0 1px ${BRAND}1F`,
				}}>
				{icon}
			</div>
			<div>
				<h4 className="text-sm font-semibold text-slate-900">{title}</h4>
				<p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
			</div>
		</div>
	);
}

function LinkPrimary({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
			style={{ backgroundColor: BRAND }}>
			{children}
		</Link>
	);
}

function LinkGhost({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition"
			style={{ color: BRAND, borderColor: BRAND }}>
			{children}
		</Link>
	);
}

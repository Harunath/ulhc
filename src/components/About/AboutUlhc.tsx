"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle, FiUsers, FiShield } from "react-icons/fi";

const BRAND = "#045e5a";

export default function AboutUlhc() {
	return (
		<section className="relative bg-neutral-50">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Top Accent */}
				<div className="mb-8 flex items-center gap-2">
					<span
						className="inline-block h-1.5 w-16 rounded-full"
						style={{ backgroundColor: BRAND }}
					/>
					<span
						className="inline-block h-1.5 w-6 rounded-full"
						style={{ backgroundColor: `${BRAND}33` }}
					/>
				</div>

				<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
					{/* Left: Copy */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="lg:col-span-7">
						<span
							className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 "
							style={{
								color: BRAND,
								backgroundColor: `${BRAND}1A`,
								boxShadow: `inset 0 0 0 1px ${BRAND}33`,
							}}>
							About Us
						</span>

						<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Unity Life Health Care <span className="sr-only">(ULHC)</span>
							<span className="block text-base font-semibold tracking-normal text-slate-600">
								(ULHC) in association with{" "}
								<span className="font-bold">VR Kisan Parivaar (VRKP)</span>
							</span>
						</h2>

						<p className="mt-5 leading-relaxed text-slate-700">
							Unity Life Health Care (ULHC), collaborates with select hospitals
							to deliver <strong>affordable, high-quality surgical care</strong>{" "}
							to members of our trusted communities.
						</p>

						<p className="mt-4 leading-relaxed text-slate-700">
							We are dedicated to <strong>seamless coordination</strong>,{" "}
							<strong>timely payments</strong>, and strengthening healthcare
							access for <strong>underserved populations</strong>.
						</p>

						{/* Pillars */}
						<ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
							{[
								{
									label: "Affordable Surgical Care",
									icon: <FiCheckCircle className="h-5 w-5" />,
								},
								{
									label: "Seamless Coordination",
									icon: <FiUsers className="h-5 w-5" />,
								},
								{
									label: "Timely Payments",
									icon: <FiShield className="h-5 w-5" />,
								},
							].map((item) => (
								<li
									key={item.label}
									className="flex items-center gap-2 rounded-xl border bg-neutral-50 p-3 text-sm text-slate-800 shadow-sm transition hover:shadow-md"
									style={{ borderColor: "#e5e7eb" }}>
									<span
										className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1"
										style={{
											color: BRAND,
											backgroundColor: `${BRAND}14`,
											boxShadow: `inset 0 0 0 1px ${BRAND}1F`,
										}}>
										{item.icon}
									</span>
									<span className="font-medium">{item.label}</span>
								</li>
							))}
						</ul>

						{/* CTAs */}
						<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							<Link
								href="/hcp"
								className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition sm:w-auto"
								style={{ backgroundColor: BRAND }}>
								Explore Benefits
							</Link>
							{/* <Link
								href="/join"
								className="inline-flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition sm:w-auto"
								style={{ color: BRAND, borderColor: BRAND }}>
								Join Our Community
							</Link> */}
						</div>
					</motion.div>

					{/* Right: Stats / Highlights */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
						className="lg:col-span-5">
						<div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
							<div>
								<div className="text-xs font-medium uppercase tracking-wider text-slate-500">
									At a glance
								</div>

								<div className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-neutral-50">
									{[
										{ value: "10K+", label: "Members" },
										{ value: "500+", label: "Partner Hospitals" },
										{ value: "100+", label: "Districts" },
									].map((s, idx) => (
										<div
											key={s.label}
											className={[
												"flex flex-col items-center justify-center p-4 text-center",
												idx === 1 ? "bg-[rgba(4,94,90,0.05)]" : "bg-neutral-50",
											].join(" ")}>
											<div
												className="text-xl font-bold leading-none sm:text-2xl"
												style={{ color: BRAND }}>
												{s.value}
											</div>
											<div className="mt-1 text-[11px] uppercase tracking-wider text-slate-600 sm:text-xs">
												{s.label}
											</div>
										</div>
									))}
								</div>

								{/* Value points */}
								<ul className="mt-6 space-y-3">
									{[
										"Empanelled & vetted hospital network",
										"Case coordination from admission to discharge",
										"Transparent pricing & negotiated packages",
										"Fast claim processing & timely settlement",
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
					</motion.div>
				</div>
			</div>

			{/* Soft background accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(4,94,90,0.16), transparent)",
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(4,94,90,0.12), transparent)",
				}}
			/>
		</section>
	);
}

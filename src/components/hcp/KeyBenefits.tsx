"use client";

import { FiCheckCircle, FiShield } from "react-icons/fi";

const BRAND = "#045e5a";

type Audience = "patient" | "hospital";

export default function KeyBenefits({}: { audience?: Audience }) {
	return (
		<section className="relative bg-neutral-50">
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
						Key Benefits of the ULHC Health Care
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Real savings. Trusted support.
					</h2>
					<p className="mt-3 text-slate-600">
						Benefits designed to reduce medical expenses and support you during
						care.
					</p>
				</div>

				{/* Cards */}
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
					<BenefitCard
						title="Pharmacy, Lab & Radiology Discounts"
						desc="Save instantly on essential medicines, diagnostic tests, and imaging services at our verified partner network."
					/>

					<BenefitCard
						title="Free Second Medical Opinion"
						desc="Get a second opinion from approved specialists at no extra cost—so you can make informed healthcare decisions."
					/>

					<BenefitCard
						title="Support for Surgical Implants & Materials"
						desc="We assist in sourcing authentic surgical implants and medical materials, reducing stress during critical procedures."
					/>
				</div>

				{/* Bottom note */}
				<p className="mt-8 text-center text-xs text-slate-500">
					Availability and limits may vary by partner and location. See your
					member dashboard for details.
				</p>
			</div>

			{/* Soft brand accent */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#045e5a0f] to-transparent"
			/>
		</section>
	);
}

function BenefitCard({ title, desc }: { title: string; desc: string }) {
	return (
		<article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-neutral-50 p-6 shadow-sm transition hover:shadow-md">
			{/* badge */}
			<span
				className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1"
				style={{
					color: BRAND,
					backgroundColor: `${BRAND}12`,
					boxShadow: `inset 0 0 0 1px ${BRAND}26`,
				}}>
				<FiShield className="h-3.5 w-3.5" />
				Included Benefit
			</span>

			<div className="mt-4 flex items-start gap-4">
				<div
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1"
					style={{
						color: BRAND,
						backgroundColor: `${BRAND}14`,
						boxShadow: `inset 0 0 0 1px ${BRAND}1F`,
					}}>
					<FiCheckCircle className="h-5 w-5" />
				</div>

				<div>
					<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
					<p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
				</div>
			</div>

			{/* accent */}
			<div
				className="mt-6 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
				style={{ backgroundColor: BRAND }}
			/>
		</article>
	);
}

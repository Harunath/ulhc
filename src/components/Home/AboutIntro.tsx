"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutIntro() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				<div className="grid items-center gap-10 lg:grid-cols-2">
					{/* Copy */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, ease: "easeOut" }}>
						<span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
							Who We Are
						</span>

						<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Unity Life Health Care (ULHC)
						</h2>

						<p className="mt-4 max-w-prose text-slate-600">
							ULHC is a community-first healthcare initiative focused on{" "}
							<span className="font-medium text-slate-800">affordability</span>,{" "}
							<span className="font-medium text-slate-800">access</span>, and{" "}
							<span className="font-medium text-slate-800">trust</span>. We
							reduce the financial burden of medical care by offering genuine
							savings and guidance—so individuals and families can get the help
							they need, when they need it most.
						</p>

						{/* Value bullets */}
						<ul className="mt-6 space-y-3 text-slate-700">
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
								Save on pharmacy, lab, and radiology services with verified
								partners.
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
								Free second medical opinion from approved specialists.
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
								In-patient benefits (up to 6 days): doctor’s fees, nursing, OT,
								and general ward/bed.
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
								Assistance in sourcing surgical implants & materials.
							</li>
						</ul>

						{/* CTAs */}
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href="/about"
								className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
								Learn more about ULHC
							</Link>
							<Link
								href="/hcp"
								className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50">
								Explore the Health Card Program
							</Link>
						</div>

						{/* Trust badges / quick stats */}
						<div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-lg">
							<div className="rounded-xl border border-slate-200 p-4">
								<p className="text-2xl font-bold text-slate-900">
									Up to 6 Days
								</p>
								<p className="text-sm text-slate-600">In-patient benefits</p>
							</div>
							<div className="rounded-xl border border-slate-200 p-4">
								<p className="text-2xl font-bold text-slate-900">2nd Opinion</p>
								<p className="text-sm text-slate-600">
									From approved specialists
								</p>
							</div>
						</div>
					</motion.div>

					{/* Visual */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
						className="relative">
						{/* Decorative gradient blob */}
						<div
							aria-hidden
							className="pointer-events-none absolute -inset-x-6 -top-6 -bottom-6 -z-10 blur-3xl"
							style={{
								background:
									"radial-gradient(600px 300px at 70% 30%, rgba(59,130,246,0.20), transparent 70%), radial-gradient(500px 250px at 20% 70%, rgba(59,130,246,0.12), transparent 60%)",
							}}
						/>
						<div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
							<Image
								src="https://res.cloudinary.com/dk0smdu0d/image/upload/v1756832323/wp8003033_krtgt7.jpg"
								alt="ULHC — trusted healthcare support"
								width={1200}
								height={900}
								className="h-full w-full object-cover"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiShield } from "react-icons/fi";

const steps = [
	{
		title: "Join ULHC",
		desc: "Create your account and get your ULHC Health Card in minutes.",
		icon: <FiUsers className="h-6 w-6 text-[#045e5a]" />,
	},
	{
		title: "Access Benefits",
		desc: "Use pharmacy, lab & radiology discounts and in-patient benefits at partners.",
		icon: <FiCheckCircle className="h-6 w-6 text-[#045e5a]" />,
	},
	{
		title: "Peace of Mind",
		desc: "Save on medical expenses and stay protected with trusted medical support.",
		icon: <FiShield className="h-6 w-6 text-[#045e5a]" />,
	},
];

export default function HowItWorks() {
	return (
		<section className="relative bg-neutral-50">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/20">
						Getting Started
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Simple. Affordable. Trusted.
					</h2>
					<p className="mt-3 text-slate-600">
						Three easy steps to start saving and accessing trusted care with
						ULHC.
					</p>
				</div>

				{/* Timeline / Cards */}
				<div className="relative mt-12 lg:mt-16">
					{/* Vertical line for large screens */}
					<div
						aria-hidden
						className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#045e5a]/20 via-[#045e5a]/10 to-transparent lg:block"
					/>

					<ol className="grid gap-6 sm:gap-8 lg:grid-cols-2">
						{steps.map((step, i) => (
							<motion.li
								key={step.title}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
								className="group relative">
								{/* Connector dots (desktop) */}
								<div className="hidden lg:block">
									<div
										className={[
											"absolute left-1/2 top-3 -translate-x-1/2 h-3 w-3 rounded-full ring-4 ring-white",
											i === 0
												? "bg-[#045e5a]"
												: "bg-[#045e5a]/20 group-hover:bg-[#045e5a] transition-colors",
										].join(" ")}
										aria-hidden
									/>
								</div>

								{/* Card */}
								<div className="relative rounded-2xl border border-slate-200 bg-neutral-50 p-6 shadow-sm transition hover:shadow-md lg:max-w-xl lg:mx-auto">
									<div className="flex items-start gap-4">
										<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#045e5a]/10 ring-1 ring-[#045e5a]/10">
											{step.icon}
										</div>
										<div>
											<h3 className="text-base font-semibold text-slate-900">
												{`${i + 1}. ${step.title}`}
											</h3>
											<p className="mt-1 text-sm leading-relaxed text-slate-600">
												{step.desc}
											</p>
										</div>
									</div>

									{/* Hover accent */}
									<div className="mt-6 h-0.5 w-0 bg-[#045e5a] transition-all duration-300 group-hover:w-full" />
								</div>
							</motion.li>
						))}
					</ol>
				</div>
			</div>

			{/* Soft background accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(59,130,246,0.16), transparent)",
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

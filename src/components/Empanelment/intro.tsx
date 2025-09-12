"use client";

import { motion } from "framer-motion";
import {
	FaUsers,
	FaWallet,
	FaClipboardCheck,
	FaBuilding,
	FaFileAlt,
	FaStethoscope,
	FaChevronRight,
	FaShieldAlt,
	FaStar,
	FaHandshake,
	FaClipboardList,
} from "react-icons/fa";

const BRAND = "#045e5a"; // ULHC brand color

const valueProps = [
	{
		title: "Steady Patient Inflow",
		desc: "Predictable referrals via the VR Kisan Parivaar (VRKP) network.",
		Icon: FaUsers,
	},
	{
		title: "₹25,000 Fixed Surgical Benefit",
		desc: "Paid promptly upon patient approval for reliable revenue.",
		Icon: FaWallet,
	},
	{
		title: "Simplified Process",
		desc: "ULHC manages pre-authorization, documentation & member coordination.",
		Icon: FaClipboardCheck,
	},
	{
		title: "Enhanced Trust & Visibility",
		desc: "Be recognized within the VRKP community as a trusted partner.",
		Icon: FaBuilding,
	},
	{
		title: "Simple Empanelment Agreement",
		desc: "Clear terms and quick onboarding with dedicated support.",
		Icon: FaFileAlt,
	},
	{
		title: "Immediate Access",
		desc: "Tap into the VRKP member base for treatments and surgeries.",
		Icon: FaStethoscope,
	},
];

const empanelBenefits = [
	{
		title: "Timely Payments",
		desc: "Direct hospital payments made by ULHC following patient approval.",
		Icon: FaShieldAlt,
	},
	{
		title: "Higher Utilization",
		desc: "Increase occupancy across wards and surgical units with steady referrals.",
		Icon: FaStar,
	},
	{
		title: "Admin Support",
		desc: "We assist with documentation, approvals, and settlement tracking.",
		Icon: FaClipboardList,
	},
	{
		title: "Win–Win Partnership",
		desc: "Affordable care for members, reliable revenue for hospitals.",
		Icon: FaHandshake,
	},
];

const steps = [
	{
		step: 1,
		title: "Apply",
		desc: "Submit the empanelment form with basic hospital details & specialties.",
	},
	{
		step: 2,
		title: "Review",
		desc: "ULHC vets credentials, infrastructure, and service capabilities.",
	},
	{
		step: 3,
		title: "Agreement",
		desc: "Sign a simple, clear empanelment agreement with transparent terms.",
	},
	{
		step: 4,
		title: "Onboarding",
		desc: "Get listed in the partner directory and receive process training.",
	},
	{
		step: 5,
		title: "Go Live",
		desc: "Start receiving VRKP referrals; ULHC coordinates approvals & payments.",
	},
];

// Motion helpers
const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 22 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.45, delay },
});

export default function Intro() {
	return (
		<div className="bg-white">
			{/* HERO */}
			<section className="relative overflow-hidden">
				{/* Decorative top ring */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-[#045e5a0f] to-transparent"
				/>
				<div className="mx-auto max-w-7xl px-6 pt-20 pb-14 lg:px-8 ">
					<div className="grid items-center gap-12 lg:grid-cols-2 pt-10">
						<div>
							<span
								className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide "
								style={{ backgroundColor: "#045e5a12", color: BRAND }}>
								Empanelment
							</span>
							<h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
								Partner with <span style={{ color: BRAND }}>ULHC</span>
							</h1>
							<p className="mt-5 text-lg leading-7 text-gray-600">
								We collaborate with select hospitals to deliver affordable,
								high-quality surgical care to VR Kisan Parivaar members. ULHC
								ensures timely payments, steady referrals, and streamlined
								coordination — helping you maximize utilization while uplifting
								community health.
							</p>
							<div className="mt-8 flex flex-wrap items-center gap-4">
								<a
									href="#apply"
									className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-95"
									style={{ backgroundColor: BRAND }}>
									Apply for Empanelment
								</a>
								<a
									href="#process"
									className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#045e5a] focus-visible:ring-offset-2">
									See Onboarding Process
								</a>
							</div>
						</div>

						<div className="relative">
							<motion.div
								{...fadeUp(0.1)}
								className="rounded-3xl border border-gray-100 p-6 shadow-sm">
								<div className="grid grid-cols-2 gap-4">
									{[
										{ label: "Members", value: "10K+" },
										{ label: "Hospitals", value: "500+" },
										{ label: "Districts", value: "100+" },
										{ label: "Support", value: "24/7" },
									].map((stat, idx) => (
										<div
											key={stat.label}
											className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm ring-1 ring-gray-100">
											<p className="text-3xl font-bold tracking-tight text-gray-900">
												{stat.value}
											</p>
											<p className="mt-1 text-sm text-gray-500">{stat.label}</p>
										</div>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* VALUE PROPOSITION */}
			<section id="value" className="py-20">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<header className="mx-auto max-w-2xl text-center">
						<span
							className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
							style={{ backgroundColor: "#045e5a12", color: BRAND }}>
							Why partner with us
						</span>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
							Value Proposition for{" "}
							<span style={{ color: BRAND }}>Hospitals</span>
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Steady referrals, assured payments, and a simplified partnership —
							so you can focus on delivering great care.
						</p>
					</header>

					<div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{valueProps.map(({ title, desc, Icon }, i) => (
							<motion.div
								key={title}
								{...fadeUp(i * 0.06)}
								className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg">
								<div className="flex items-center gap-4">
									<div
										className="inline-flex h-12 w-12 items-center justify-center rounded-xl p-[1px]"
										style={{
											background: `linear-gradient(180deg, ${BRAND}22, transparent)`,
										}}>
										<div
											className="flex h-full w-full items-center justify-center rounded-[10px]"
											style={{ backgroundColor: "#ffffff", color: BRAND }}>
											<Icon className="h-6 w-6" />
										</div>
									</div>
									<h3 className="text-lg font-semibold text-gray-900">
										{title}
									</h3>
								</div>
								<p className="mt-3 text-sm leading-relaxed text-gray-600">
									{desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* BENEFITS OF EMPANELMENT */}
			<section id="benefits" className="py-20 bg-gray-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<header className="mx-auto max-w-2xl text-center">
						<span
							className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
							style={{ backgroundColor: "#045e5a12", color: BRAND }}>
							What you get
						</span>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
							Benefits of <span style={{ color: BRAND }}>Empanelment</span>
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Join a community-trusted initiative with reliable revenue and
							strong support.
						</p>
					</header>

					<div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						{empanelBenefits.map(({ title, desc, Icon }, i) => (
							<motion.div
								key={title}
								{...fadeUp(i * 0.06)}
								className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg">
								<div className="flex items-center gap-3">
									<div
										className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
										style={{ backgroundColor: "#045e5a12", color: BRAND }}>
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="text-base font-semibold text-gray-900">
										{title}
									</h3>
								</div>
								<p className="mt-3 text-sm text-gray-600">{desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* PROCESS */}
			<section id="process" className="py-20">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<header className="mx-auto max-w-2xl text-center">
						<span
							className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
							style={{ backgroundColor: "#045e5a12", color: BRAND }}>
							How it works
						</span>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
							Onboarding <span style={{ color: BRAND }}>Process</span>
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							From application to live referrals in a few simple steps.
						</p>
					</header>

					<ol className="relative mx-auto mt-12 max-w-3xl border-l border-gray-200 pl-6">
						{steps.map((s, i) => (
							<motion.li
								key={s.step}
								{...fadeUp(i * 0.05)}
								className="mb-10 ml-4">
								<span
									className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white"
									style={{ backgroundColor: BRAND }}>
									{s.step}
								</span>
								<h3 className="text-base font-semibold text-gray-900">
									{s.title}
								</h3>
								<p className="mt-1 text-sm text-gray-600">{s.desc}</p>
							</motion.li>
						))}
					</ol>
				</div>
			</section>

			{/* CTA */}
			<section className="pb-24">
				<div className="mx-auto max-w-5xl px-6 text-center">
					<div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm ring-1 ring-gray-100">
						<h3 className="text-2xl font-bold text-gray-900">
							Ready to join the <span style={{ color: BRAND }}>ULHC</span>{" "}
							network?
						</h3>
						<p className="mt-3 mx-auto max-w-2xl text-gray-600">
							Apply today to become an empaneled partner hospital. Our team will
							reach out with next steps within 2–3 business days.
						</p>
						<a
							href="#apply"
							className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:opacity-95"
							style={{ backgroundColor: BRAND }}>
							Apply for Empanelment <FaChevronRight className="h-4 w-4" />
						</a>
					</div>
				</div>
			</section>

			{/* APPLY (placeholder anchor for your form section) */}
			<div id="apply" className="h-2" />
		</div>
	);
}

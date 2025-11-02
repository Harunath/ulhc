"use client";

import React, { memo, useMemo } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
	FaUsers,
	FaWallet,
	FaClipboardCheck,
	FaBuilding,
	FaFileAlt,
	FaStethoscope,
	FaShieldAlt,
	FaStar,
	FaHandshake,
	FaClipboardList,
} from "react-icons/fa";

const fadeParent = {
	hidden: { opacity: 0, y: 10 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, staggerChildren: 0.05 },
	},
};
const fadeItem = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Intro() {
	// memoized data prevents new refs on every render
	const stats = useMemo(
		() => [
			{ label: "Members", value: "10K+" },
			{ label: "Hospitals", value: "500+" },
			{ label: "Districts", value: "100+" },
			{ label: "Support", value: "24/7" },
		],
		[]
	);

	const valueProps = useMemo(
		() => [
			{
				title: "Access to Member Referrals",
				desc: "Receive steady patient referrals from ULHC program members.",
				Icon: FaUsers,
			},
			{
				title: "Fixed Benefit per Approved Case",
				desc: "Assured benefit amount disbursed for every approved case.",
				Icon: FaWallet,
			},
			{
				title: "Approval & Documentation Help",
				desc: "Guidance on approvals, paperwork, and coordination end-to-end.",
				Icon: FaClipboardCheck,
			},
			{
				title: "Trusted Provider Visibility",
				desc: "Be featured as a verified healthcare partner within our network.",
				Icon: FaBuilding,
			},
			{
				title: "Simple, Transparent Onboarding",
				desc: "Clear terms, quick empanelment, and responsive support.",
				Icon: FaFileAlt,
			},
			{
				title: "Immediate Program Access",
				desc: "Begin serving members soon after onboarding is completed.",
				Icon: FaStethoscope,
			},
		],
		[]
	);

	const empanelBenefits = useMemo(
		() => [
			{
				title: "Timely, Direct Settlements",
				desc: "Payments released promptly on approved cases as per program norms.",
				Icon: FaShieldAlt,
			},
			{
				title: "Higher Utilization",
				desc: "Boost occupancy across wards and surgical units via consistent inflow.",
				Icon: FaStar,
			},
			{
				title: "Operational Support",
				desc: "We assist with documentation, approvals, and claims tracking.",
				Icon: FaClipboardList,
			},
			{
				title: "Win–Win Partnership",
				desc: "Affordable care for members, predictable revenue for hospitals.",
				Icon: FaHandshake,
			},
		],
		[]
	);

	const steps = useMemo(
		() => [
			{
				step: 1,
				title: "Submit Hospital Information",
				desc: "Share your hospital profile, specialties, and facilities for review.",
			},
			{
				step: 2,
				title: "Credential & Service Review",
				desc: "ULHC evaluates credentials and alignment with program standards.",
			},
			{
				step: 3,
				title: "Agreement & Onboarding",
				desc: "Sign the partnership agreement and complete formal onboarding.",
			},
			{
				step: 4,
				title: "Start Serving ULHC Members",
				desc: "Go live, receive referrals, and get ongoing support from our team.",
			},
		],
		[]
	);

	return (
		<div className="bg-neutral-50 pt-20">
			<section className="relative overflow-hidden">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-[#045e5a0f] to-transparent"
				/>
				<div className="mx-auto max-w-7xl px-6 pt-10 pb-14 lg:px-8">
					<LazyMotion features={domAnimation}>
						<m.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							variants={fadeParent}>
							<div className="grid items-center gap-10 lg:grid-cols-2 pt-6">
								{/* Copy */}
								<m.div variants={fadeItem}>
									<span className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-[#045e5a12] text-[#045e5a]">
										Empanelment
									</span>
									<h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
										Partner with <span className="text-[#045e5a]">ULHC</span>
									</h1>
									<p className="mt-5 text-lg leading-7 text-gray-600">
										ULHC invites hospitals and medical service providers to join
										its partner network. Together, we deliver affordable,
										high-quality care to program members with transparent
										benefits, streamlined processes, and ongoing support.
									</p>
								</m.div>

								{/* Stats */}
								<m.div variants={fadeItem} className="relative">
									<div className="rounded-3xl border border-gray-100 p-6 shadow-sm">
										<div className="grid grid-cols-2 gap-4">
											{stats.map((stat) => (
												<div
													key={stat.label}
													className="rounded-2xl border border-gray-100 bg-neutral-50 p-5 text-center shadow-sm transition will-change-transform hover:-translate-y-0.5">
													<p className="text-3xl font-bold tracking-tight text-gray-900">
														{stat.value}
													</p>
													<p className="mt-1 text-sm text-gray-500">
														{stat.label}
													</p>
												</div>
											))}
										</div>
									</div>
								</m.div>
							</div>
						</m.div>
					</LazyMotion>
				</div>
			</section>

			{/* WHY PARTNER */}
			<section id="value" className="py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<header className="mx-auto max-w-2xl text-center">
						<span className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-[#045e5a12] text-[#045e5a]">
							Why Partner with ULHC
						</span>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
							Benefits for <span className="text-[#045e5a]">Hospitals</span>
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Access referrals, assured benefits on approved cases, and full
							administrative support with a simple, transparent onboarding.
						</p>
					</header>

					{/* Single parent animation for the grid */}
					<LazyMotion features={domAnimation}>
						<m.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							variants={fadeParent}
							className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{valueProps.map(({ title, desc, Icon }) => (
								<m.div
									key={title}
									variants={fadeItem}
									className="group rounded-2xl border border-gray-100 bg-neutral-50 p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
									<div className="flex items-center gap-4">
										<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#045e5a12] text-[#045e5a]">
											<Icon className="h-6 w-6" />
										</div>
										<h3 className="text-lg font-semibold text-gray-900">
											{title}
										</h3>
									</div>
									<p className="mt-3 text-sm leading-relaxed text-gray-600">
										{desc}
									</p>
								</m.div>
							))}
						</m.div>
					</LazyMotion>
				</div>
			</section>

			{/* BENEFITS */}
			<section id="benefits" className="py-16 bg-neutral-50">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<header className="mx-auto max-w-2xl text-center">
						<span className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-[#045e5a12] text-[#045e5a]">
							What you get
						</span>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
							Program <span className="text-[#045e5a]">Advantages</span>
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Predictable settlements, stronger utilization, and hands-on
							administrative support.
						</p>
					</header>

					<LazyMotion features={domAnimation}>
						<m.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							variants={fadeParent}
							className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							{empanelBenefits.map(({ title, desc, Icon }) => (
								<m.div
									key={title}
									variants={fadeItem}
									className="rounded-2xl border border-gray-100 bg-neutral-50 p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
									<div className="flex items-center gap-3">
										<div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#045e5a12] text-[#045e5a]">
											<Icon className="h-5 w-5" />
										</div>
										<h3 className="text-base font-semibold text-gray-900">
											{title}
										</h3>
									</div>
									<p className="mt-3 text-sm text-gray-600">{desc}</p>
								</m.div>
							))}
						</m.div>
					</LazyMotion>
				</div>
			</section>

			{/* PROCESS */}
			<section id="process" className="py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<header className="mx-auto max-w-2xl text-center">
						<span className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-[#045e5a12] text-[#045e5a]">
							How it works
						</span>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
							Onboarding <span className="text-[#045e5a]">Process</span>
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							From application to serving members in four simple steps.
						</p>
					</header>

					<LazyMotion features={domAnimation}>
						<m.ol
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, amount: 0.2 }}
							variants={fadeParent}
							className="relative mx-auto mt-10 max-w-3xl border-l border-gray-200 pl-6">
							{steps.map((s) => (
								<m.li key={s.step} variants={fadeItem} className="mb-8 ml-4">
									<span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white bg-[#045e5a]">
										{s.step}
									</span>
									<h3 className="text-base font-semibold text-gray-900">
										{s.title}
									</h3>
									<p className="mt-1 text-sm text-gray-600">{s.desc}</p>
								</m.li>
							))}
						</m.ol>
					</LazyMotion>
				</div>
			</section>

			{/* anchor */}
			<div id="apply" className="h-2" />
		</div>
	);
}

// (Optional) If these cards don’t change, memo helps avoid re-renders when parent updates.
export const MemoCard = memo(function MemoCard({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={className}>{children}</div>;
});

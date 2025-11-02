"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiUsers, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const BRAND = "#045e5a";

export default function MemberSupportCard() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 14 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.4 }}
			className="w-full">
			<div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-neutral-50 p-6 shadow-sm transition hover:shadow-md sm:p-8 md:p-10">
				{/* Top row */}
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<span
							className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
							style={{ backgroundColor: `${BRAND}14`, color: BRAND }}>
							<FiUsers className="h-5 w-5" />
						</span>
						<span
							className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white"
							style={{ backgroundColor: BRAND }}>
							For Members / Patients
						</span>
					</div>
				</div>

				{/* Title + copy */}
				<h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
					Personal guidance for your{" "}
					<span style={{ color: BRAND }}>ULHC Health Care Program</span>
				</h3>
				<p className="mt-3 text-base leading-7 text-slate-600 sm:text-[17px]">
					Have questions about membership, benefits, or accessing services? Our
					team will guide you and ensure you make the most of your ULHC Health
					Care Program.
				</p>

				{/* Highlights – responsive grid with good spacing */}
				<ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
					<Li>Help using partner hospitals, labs & pharmacies</Li>
					<Li>Support for second opinions & procedures</Li>
					<Li>Clear, simple steps for using benefits</Li>
					<Li>Fast responses from our support team</Li>
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

function Li({ children }: { children: React.ReactNode }) {
	return (
		<li className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2">
			<span
				className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
				style={{ backgroundColor: `${BRAND}14`, color: BRAND }}>
				<FiCheckCircle className="h-3.5 w-3.5" />
			</span>
			<span className="text-sm text-slate-700">{children}</span>
		</li>
	);
}

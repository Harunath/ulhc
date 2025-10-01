"use client";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

const BRAND = "#045e5a";

export default function Purpose() {
	return (
		<section className="relative overflow-hidden bg-white mt-20">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ">
				{/* Card */}
				<div className="relative overflow-hidden rounded-3xl bg-white px-6 py-10 shadow-md ring-1 ring-slate-200 sm:px-10 lg:px-14">
					{/* Header */}
					<span
						className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
						style={{ backgroundColor: BRAND }}>
						ULHC Health Care Program
					</span>

					<h2
						className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
						style={{ color: BRAND }}>
						Trusted medical support and smarter healthcare spending
					</h2>
					<p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
						The ULHC Health Care Program helps members access trusted medical
						support and manage healthcare expenses.
					</p>

					{/* Member Coverage Includes */}
					<div className="mt-8">
						<h3 className="text-lg font-semibold text-slate-900">
							Member Coverage Includes
						</h3>
						<ul className="mt-3 grid gap-3 sm:grid-cols-2">
							<li className="flex items-start gap-3">
								<Bullet />
								<span className="text-slate-700">
									Discounts at partner pharmacies, labs, and radiology centers
								</span>
							</li>
							<li className="flex items-start gap-3">
								<Bullet />
								<span className="text-slate-700">
									Free second opinion from approved specialists
								</span>
							</li>
							<li className="flex items-start gap-3">
								<Bullet />
								<span className="text-slate-700">
									Assistance with surgical implants and medical materials
								</span>
							</li>
						</ul>
					</div>

					{/* Getting Started */}
					<div className="mt-10">
						<h3 className="text-lg font-semibold text-slate-900">
							Getting Started
						</h3>
						<ol className="mt-3 space-y-3">
							<li className="flex gap-3">
								<StepNumber n={1} />
								<span className="text-slate-700">
									Enroll in the Program – Sign up to become a ULHC member.
								</span>
							</li>
							<li className="flex gap-3">
								<StepNumber n={2} />
								<span className="text-slate-700">
									Access Services – Visit partner hospitals, labs, and
									pharmacies to use your benefits.
								</span>
							</li>
							<li className="flex gap-3">
								<StepNumber n={3} />
								<span className="text-slate-700">
									Get Support – Reach out anytime for guidance or assistance
									with medical services.
								</span>
							</li>
						</ol>
					</div>

					{/* Subtle bottom accent */}
					<div
						className="mt-8 h-1 w-20 rounded-full"
						style={{ backgroundColor: BRAND }}
					/>
				</div>
			</div>
		</section>
	);
}

/* ---------- Bits ---------- */

function Bullet() {
	return (
		<span
			className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
			style={{ backgroundColor: `${BRAND}1A`, color: BRAND }}>
			<FiCheckCircle className="h-4 w-4" />
		</span>
	);
}

function StepNumber({ n }: { n: number }) {
	return (
		<span
			className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
			style={{ backgroundColor: BRAND }}>
			{n}
		</span>
	);
}

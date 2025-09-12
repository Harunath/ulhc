"use client";

import Link from "next/link";

const BRAND = "#045e5a";

export default function JoinULHC() {
	return (
		<section className="relative overflow-hidden bg-white">
			<div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
				<div className="relative rounded-3xl bg-white px-6 py-10 text-center shadow-md ring-1 ring-slate-200 sm:px-10">
					{/* Label */}
					<span
						className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
						style={{ backgroundColor: BRAND }}>
						Join Us
					</span>

					{/* Heading */}
					<h2
						className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
						style={{ color: BRAND }}>
						Together, we can make healthcare simple, affordable, and trusted for
						everyone.
					</h2>

					{/* Subline with pointer */}
					<p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
						<span className="mr-1">👉</span>
						Be part of a community that believes in collective well-being.
					</p>

					{/* CTAs */}
					<div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Link
							href="/join"
							className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition sm:w-auto"
							style={{ backgroundColor: BRAND }}>
							Get Your Health Card Today
						</Link>
						<Link
							href="/hcp"
							className="inline-flex w-full items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition sm:w-auto"
							style={{ borderColor: BRAND, color: BRAND }}>
							See Member Benefits
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

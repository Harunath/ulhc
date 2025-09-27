"use client";

import Link from "next/link";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

const BRAND = "#045e5a";

export default function Highlights() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-6xl px-6 py-14">
				<div
					className="group relative overflow-hidden rounded-3xl p-[1px] transition-shadow hover:shadow-lg"
					style={{
						background: `linear-gradient(135deg, ${BRAND}33, transparent 40%, ${BRAND}22)`,
					}}>
					{/* Card */}
					<div className="relative rounded-[calc(1.5rem-1px)] bg-white/90 p-7 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:p-9">
						{/* Top tag + icon */}
						<div className="flex items-center gap-3">
							<span
								className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
								style={{ backgroundColor: `${BRAND}14`, color: BRAND }}>
								<FiBookOpen className="h-5 w-5" />
							</span>
							<span
								className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white"
								style={{ backgroundColor: BRAND }}>
								Program Guide
							</span>
						</div>

						{/* Title + copy */}
						<div className="mt-4 grid items-end gap-6 sm:grid-cols-[1fr_auto]">
							<div>
								<h2 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
									Your ULHC Health Care Program — at a glance
								</h2>
								<p className="mt-2 text-[15px] leading-7 text-slate-700 sm:text-base">
									For your convenience, we’ve outlined the benefits, processes,
									and support available through the ULHC Health Care Program.
									This guide helps you make the most of your membership and
									enjoy all the services provided.
								</p>
							</div>

							<Link
								href="/legals/hcp-guidelines"
								className="group/btn inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
								style={{ backgroundColor: BRAND }}>
								View Guidelines
								<FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
							</Link>
						</div>

						{/* Bottom accent bar */}
						<div
							className="mt-6 h-1 w-16 rounded-full"
							style={{ backgroundColor: BRAND }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

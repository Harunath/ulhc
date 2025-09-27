"use client";

import Link from "next/link";
import { FiUserPlus, FiHome } from "react-icons/fi";

const BRAND = "#045e5a";

export default function NextStep() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:flex-row sm:text-left">
					{/* Heading */}
					<div>
						<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							Ready to take the next step?
						</h2>
						<p className="mt-2 text-sm text-gray-600 sm:text-base">
							Join ULHC as a member or partner hospital today.
						</p>
					</div>

					{/* Buttons */}
					<div className="flex flex-col gap-3 sm:flex-row">
						<Link
							href="/join"
							className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:w-auto"
							style={{ backgroundColor: BRAND }}>
							<FiUserPlus className="mr-2 h-4 w-4" />
							Join as a Member
						</Link>

						<Link
							href="/empanel"
							className="inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold transition sm:w-auto"
							style={{ borderColor: BRAND, color: BRAND }}>
							<FiHome className="mr-2 h-4 w-4" />
							Join as a Hospital
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

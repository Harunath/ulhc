"use client";

import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const BRAND = "#045e5a";

export default function ContactSection() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
				{/* Header */}
				<div className="text-center max-w-3xl mx-auto">
					<div
						className="mx-auto mb-6 h-1 w-20 rounded-full"
						style={{ backgroundColor: BRAND }}
					/>
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Reach Out to <span style={{ color: BRAND }}>ULHC</span>
					</h1>
					<p className="mt-4 text-lg leading-7 text-gray-600">
						We&apos;re here to support you! Whether you are a member seeking care or
						a hospital interested in partnering, our team is ready to assist
						you.
					</p>
				</div>

				{/* Info Cards */}
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<InfoCard
						icon={<FiPhone className="h-6 w-6" />}
						title="Phone"
						value="[ ]"
					/>
					<InfoCard
						icon={<FiMail className="h-6 w-6" />}
						title="Email"
						value="unitylifehealthcare@gmail.com"
					/>
					<InfoCard
						icon={<FiMapPin className="h-6 w-6" />}
						title="Address"
						value="Hyderabad, Telangana"
					/>
				</div>
			</div>
		</section>
	);
}

/* ---------- Subcomponents ---------- */

function InfoCard({
	icon,
	title,
	value,
}: {
	icon: React.ReactNode;
	title: string;
	value: string;
}) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm hover:shadow-md transition">
			<div
				className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
				style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
				{icon}
			</div>
			<h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>
			<p className="mt-1 text-sm text-gray-700">{value}</p>
		</div>
	);
}

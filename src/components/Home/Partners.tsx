"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

type Partner = {
	name: string;
	logo: string;
	category: "Hospital" | "Lab" | "Pharmacy" | "Radiology";
	address: string;
	contact: string;
};

const partners: Partner[] = [
	{
		name: "CityCare Hospital",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Hospital",
		address: "123 Main Road, Hyderabad, Telangana",
		contact: "",
	},
	{
		name: "Prime Diagnostics",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Lab",
		address: "22 Banjara Hills, Hyderabad, Telangana",
		contact: "",
	},
	{
		name: "BlueShield Pharmacy",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Pharmacy",
		address: "45 Begumpet, Hyderabad, Telangana",
		contact: "",
	},
	{
		name: "Radiant Imaging",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Radiology",
		address: "78 Kukatpally, Hyderabad, Telangana",
		contact: "",
	},
	{
		name: "Metro Hospitals",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Hospital",
		address: "11 Ameerpet, Hyderabad, Telangana",
		contact: "",
	},
	{
		name: "AccuLab",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Lab",
		address: "99 Madhapur, Hyderabad, Telangana",
		contact: "",
	},
];

const categories = ["All", "Hospital", "Lab", "Pharmacy", "Radiology"] as const;

export default function Partners() {
	const [selected, setSelected] = useState<(typeof categories)[number]>("All");

	const filtered =
		selected === "All"
			? partners
			: partners.filter((p) => p.category === selected);

	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/20">
						Our Network
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Trusted Hospitals, Labs & Pharmacies
					</h2>
					<p className="mt-3 text-slate-600">
						Filter our growing partner ecosystem by category.
					</p>
				</div>

				{/* Filter Tabs */}
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setSelected(cat)}
							className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
								selected === cat
									? "bg-[#045e5a] text-white border-[#045e5a]"
									: "border-slate-300 text-slate-600 hover:bg-slate-100"
							}`}>
							{cat}
						</button>
					))}
				</div>

				{/* Logos grid with extra details */}
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:mt-14">
					{filtered.map((p, i) => (
						<motion.figure
							key={p.name}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
							className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
							<div className="relative h-20 w-full flex items-center justify-center">
								<Image
									src={p.logo}
									alt={`${p.name} logo`}
									fill
									sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 45vw"
									className="object-contain"
								/>
							</div>
							<figcaption className="mt-4 text-center">
								<h3 className="text-base font-semibold text-slate-900">
									{p.name}
								</h3>
								<p className="mt-1 text-sm text-slate-600">{p.address}</p>
								<p className="mt-1 text-sm text-slate-600">
									📞 <span className="font-medium">{p.contact}</span>
								</p>
								<span className="mt-2 inline-block rounded-md bg-[#045e5a]/10 px-2 py-0.5 text-[11px] font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/10">
									{p.category}
								</span>
							</figcaption>
						</motion.figure>
					))}
				</div>

				{/* CTA */}
				<div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
					<Link
						href="/join-member"
						className="inline-flex items-center justify-center rounded-lg bg-[#045e5a] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#034c49]">
						Join as a Member
					</Link>
					<Link
						href="/join-hospital"
						className="inline-flex items-center justify-center rounded-lg border border-[#045e5a] px-6 py-3 text-sm font-semibold text-[#045e5a] hover:bg-[#045e5a]/10">
						Join as a Hospital
					</Link>
				</div>
			</div>

			{/* Soft blue blobs */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(59,130,246,0.14), transparent)",
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(59,130,246,0.10), transparent)",
				}}
			/>
		</section>
	);
}

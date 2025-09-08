"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Partner = {
	name: string;
	logo: string;
	category: "Hospital" | "Lab" | "Pharmacy" | "Radiology";
};

const partners: Partner[] = [
	{
		name: "CityCare Hospital",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Hospital",
	},
	{
		name: "Prime Diagnostics",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Lab",
	},
	{
		name: "BlueShield Pharmacy",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Pharmacy",
	},
	{
		name: "Radiant Imaging",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Radiology",
	},
	{
		name: "Metro Hospitals",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Hospital",
	},
	{
		name: "AccuLab",
		logo: "https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg",
		category: "Lab",
	},
];

export default function Partners() {
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
						A growing partner ecosystem that helps ULHC members access savings
						and care when it matters most.
					</p>
				</div>

				{/* Logos grid */}
				<div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5">
					{partners.map((p, i) => (
						<motion.figure
							key={p.name}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
							className="group relative flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md"
							title={`${p.name} • ${p.category}`}>
							<div className="relative h-14 w-full">
								<Image
									src={p.logo}
									alt={`${p.name} logo`}
									fill
									sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 45vw"
									className="object-contain"
								/>
							</div>
							<figcaption className="sr-only">{p.name}</figcaption>
							{/* category chip on hover (desktop) */}
							<div
								className="pointer-events-none absolute bottom-2 left-2 hidden rounded-md bg-[#045e5a]/10 px-2 py-0.5 text-[10px] font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/10 md:block opacity-0 group-hover:opacity-100 transition"
								aria-hidden>
								{p.category}
							</div>
						</motion.figure>
					))}
				</div>

				{/* CTA */}
				<div className="mt-12 flex justify-center">
					<Link
						href="/partners"
						className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-[#045e5a] ring-1 ring-inset ring-[#045e5a]/20 hover:bg-[#045e5a]/10">
						View All Partners →
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

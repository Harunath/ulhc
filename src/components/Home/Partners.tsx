"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const defaultLogo =
	"https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg";

type Partner = {
	name: string;
	logo?: string;
	category: "Hospital" | "Lab" | "Pharmacy" | "Radiology";
	type?: string;
	address: string;
	email?: string;
};

const partners: Partner[] = [
	{
		name: "Mediciti Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"Alekhya Towers, Mytri Nagar, Rajiv Shetti Nagar, L. B. Nagar, Kharmanghat, Hyderabad, Telangana",
		logo: defaultLogo,
	},
	{
		name: "Medistar Hospital",
		category: "Hospital",
		type: "Private",
		address:
			"H756+F35, Indresham Rd, Citizens colony, Patancheruvu, Hyderabad-502319, Telangana",
		logo: defaultLogo,
	},
	{
		name: "Medistar Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"3-13-2 Plot no 6, Mallikarjun Nagar Opp to Uppal Bus depot Peerzadiguda, Uppal, Hyderabad-500039, Telangana",
		logo: defaultLogo,
	},
	{
		name: "Medi Star Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"Murthy Mansion, Hmda Maitrivanam, H.No;8-3-214/2, Ameerpet, Hyderabad, 500038, Telangana",
		logo: defaultLogo,
	},
	{
		name: "Lifeline Tulasi Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"Tulasi Hospitals Ecil, Kushaiguda Industrial Area, Kushaiguda, Secunderabad, 500062, Telangana",
		logo: defaultLogo,
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
		<section className="relative bg-gray-50">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/20">
						Our Network
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Trusted Hospitals, Labs & Pharmacies
					</h2>
					<p className="mt-3 text-gray-600">
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
									: "border-gray-300 text-gray-600 hover:bg-[#045e5a]/10"
							}`}>
							{cat}
						</button>
					))}
				</div>

				{/* Logos grid with details */}
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:mt-14">
					{filtered.map((p, i) => (
						<motion.figure
							key={p.name}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
							className="group relative flex flex-col rounded-2xl border border-gray-200 bg-neutral-50 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
							<div className="relative h-24 w-full flex items-center justify-center">
								<Image
									src={p.logo || defaultLogo}
									alt={`${p.name} logo`}
									fill
									sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 45vw"
									className="object-contain"
								/>
							</div>
							<figcaption className="mt-5 text-center">
								<h3 className="text-lg font-semibold text-gray-900">
									{p.name}
								</h3>
								<p className="mt-1 text-sm text-gray-600">{p.address}</p>

								<div className="mt-2 flex justify-center flex-wrap gap-2">
									{p.type && (
										<span className="inline-block rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a]">
											{p.type}
										</span>
									)}
									<span className="inline-block rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a]">
										{p.category}
									</span>
								</div>

								{p.email && (
									<p className="mt-1 text-sm text-gray-700">
										✉{" "}
										<a
											href={`mailto:${p.email}`}
											className="font-medium text-[#045e5a] hover:underline">
											{p.email}
										</a>
									</p>
								)}
							</figcaption>
						</motion.figure>
					))}
				</div>
			</div>

			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(4,94,90,0.15), transparent)",
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(4,94,90,0.10), transparent)",
				}}
			/>
		</section>
	);
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const defaultLogo =
	"https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg";

type Partner = {
	name: string;
	logo?: string;
	category:
		| "Hospital"
		| "Diagnostics"
		| "Pharmacy"
		| "Radiology"
		| "Dental"
		| "Ophthalmology"
		| "Ayurvedic"
		| "Homeopathy";
	type?: string;
	address: string;
	email?: string;
	state: string;
	district: string;
};

const partners: Partner[] = [
	{
		name: "Mediciti Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"Alekhya Towers, Mytri Nagar, Rajiv Shetti Nagar, L. B. Nagar, Kharmanghat, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Medistar Hospital",
		category: "Hospital",
		type: "Private",
		address:
			"H756+F35, Indresham Rd, Citizens colony, Patancheruvu, Hyderabad-502319, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Medistar Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"3-13-2 Plot no 6, Mallikarjun Nagar Opp to Uppal Bus depot Peerzadiguda, Uppal, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Medi Star Hospitals",
		category: "Hospital",
		type: "Private",
		address: "Murthy Mansion, Hmda Maitrivanam, Ameerpet, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Lifeline Tulasi Hospitals",
		category: "Hospital",
		type: "Private",
		address:
			"Tulasi Hospitals Ecil, Kushaiguda Industrial Area, Secunderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Secunderabad",
	},

	// V Dental – 3 different districts
	{
		name: "V Dental",
		category: "Dental",
		type: "Private",
		address: "Sankaramatam Road, Visakhapatnam, Andhra Pradesh",
		logo: defaultLogo,
		state: "Andhra Pradesh",
		district: "Visakhapatnam",
	},
	{
		name: "V Dental",
		category: "Dental",
		type: "Private",
		address:
			"Mayuri Tiffins Upstairs, RTC Complex Road, Vizianagaram, Andhra Pradesh",
		logo: defaultLogo,
		state: "Andhra Pradesh",
		district: "Vizianagaram",
	},
	{
		name: "V Dental",
		category: "Dental",
		type: "Private",
		address: "Krishna Park Junction, Srikakulam, Andhra Pradesh",
		logo: defaultLogo,
		state: "Andhra Pradesh",
		district: "Srikakulam",
	},

	// Mitta (Metro) Health Care – Hyderabad Metro Locations
	{
		name: "Mitta Health Care",
		category: "Diagnostics",
		type: "Private",
		address: "LB Nagar Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Mitta Health Care",
		category: "Diagnostics",
		type: "Private",
		address: "Ameerpet Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Mitta Health Care",
		category: "Diagnostics",
		type: "Private",
		address: "Miyapur Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Mitta Health Care",
		category: "Diagnostics",
		type: "Private",
		address: "Raidurg Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},

	// Sun Diagnostics – Hyderabad
	{
		name: "Sun Diagnostics",
		category: "Diagnostics",
		type: "Private",
		address: "SR Nagar, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Sun Diagnostics",
		category: "Diagnostics",
		type: "Private",
		address: "BK Guda, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Rojitha's Scope Lab",
		category: "Diagnostics",
		type: "Private",
		address:
			"Beside Nexa Showroom, Bellampelly chowrastha, Mancherial, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Mancherial",
	},
	//pharmacy
	{
		name: "Sri Laxmi Medical&Genaral Stores",
		category: "Pharmacy",
		type: "Private",
		address:
			"Opp: Bus Stand, Indira Nagar, Railway Station Road, Mancherial, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Mancherial",
	},
	//ophthalmology
	{
		name: "Sri Laxmi Opticals",
		category: "Ophthalmology",
		type: "Private",
		address:
			"Opp: Bus Stand, Indira Nagar, Railway Station Road, Mancherial, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Mancherial",
	},
];

const categories = [
	"All",
	"Hospital",
	"Diagnostics",
	"Dental",

	"Pharmacy",
	"Radiology",
	"Ophthalmology",
	"Ayurvedic",
	"Homeopathy",
] as const;

export default function Partners() {
	const [selectedCategory, setSelectedCategory] =
		useState<(typeof categories)[number]>("All");
	const [selectedState, setSelectedState] = useState("All");
	const [selectedDistrict, setSelectedDistrict] = useState("All");

	// Unique state list
	const states = useMemo(
		() => ["All", ...Array.from(new Set(partners.map((p) => p.state)))],
		[]
	);

	// Unique districts based on selected state
	const districts = useMemo(() => {
		const filtered =
			selectedState === "All"
				? partners
				: partners.filter((p) => p.state === selectedState);

		return ["All", ...Array.from(new Set(filtered.map((p) => p.district)))];
	}, [selectedState]);

	// FINAL FILTER LOGIC
	const filteredPartners = partners.filter((p) => {
		const matchCategory =
			selectedCategory === "All" || p.category === selectedCategory;

		const matchState = selectedState === "All" || p.state === selectedState;

		const matchDistrict =
			selectedDistrict === "All" || p.district === selectedDistrict;

		return matchCategory && matchState && matchDistrict;
	});

	return (
		<section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100">
			{/* Subtle background accent */}
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,_#0f766e1a,_transparent_60%)]" />

			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="mx-auto max-w-3xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full bg-[#045e5a]/5 px-3 py-1 text-xs font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/15">
						<span className="h-1.5 w-1.5 rounded-full bg-[#0f766e]" />
						<span>ULHC Partner Network</span>
					</div>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Trusted Hospitals, Labs &amp; Pharmacies
					</h2>
					<p className="mt-3 text-sm text-slate-600 sm:text-base">
						Discover healthcare partners across categories, states, and
						districts in our growing network.
					</p>

					{/* Stats */}
					<div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-2 text-xs text-slate-600 shadow-sm ring-1 ring-slate-200/80 backdrop-blur">
						<span className="font-semibold text-slate-900">
							{filteredPartners.length}
						</span>
						<span>partners match your filters</span>
					</div>
				</div>

				{/* FILTERS */}
				<div className="mt-10 space-y-6 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm sm:p-6">
					{/* Category Pills */}
					<div className="flex flex-wrap justify-center gap-2 sm:gap-3">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-200 ${
									selectedCategory === cat
										? "bg-[#045e5a] text-white border-[#045e5a] shadow-sm"
										: "border-slate-200 text-slate-600 hover:bg-[#045e5a]/5 hover:border-[#045e5a]/40"
								}`}>
								{cat}
							</button>
						))}
					</div>

					{/* State & District Filters */}
					<div className="flex flex-wrap items-center justify-center gap-4">
						<div className="flex flex-col text-xs text-slate-500">
							<span className="mb-1 font-medium text-slate-700">State</span>
							<select
								value={selectedState}
								onChange={(e) => {
									setSelectedState(e.target.value);
									setSelectedDistrict("All");
								}}
								className="w-52 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#045e5a] focus:outline-none focus:ring-2 focus:ring-[#045e5a]/20">
								{states.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col text-xs text-slate-500">
							<span className="mb-1 font-medium text-slate-700">District</span>
							<select
								value={selectedDistrict}
								onChange={(e) => setSelectedDistrict(e.target.value)}
								className="w-52 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-[#045e5a] focus:outline-none focus:ring-2 focus:ring-[#045e5a]/20">
								{districts.map((d) => (
									<option key={d} value={d}>
										{d}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* GRID */}
				{filteredPartners.length === 0 ? (
					<div className="mt-16 flex justify-center">
						<div className="max-w-md rounded-2xl bg-white/80 px-6 py-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
							<p className="text-sm font-medium text-slate-800">
								No partners found for this combination.
							</p>
							<p className="mt-2 text-xs">
								Try changing the category, state, or district filters.
							</p>
						</div>
					</div>
				) : (
					<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-14">
						{filteredPartners.map((p, i) => (
							<motion.figure
								key={`${p.name}-${i}`}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.35,
									delay: i * 0.04,
									ease: "easeOut",
								}}
								className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#045e5a]/60 hover:shadow-lg">
								{/* Logo */}
								<div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50/80 ring-1 ring-slate-100 group-hover:bg-slate-50">
									<Image
										src={p.logo || defaultLogo}
										alt={`${p.name} logo`}
										fill
										sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
										className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
									/>
								</div>

								<figcaption className="mt-5">
									<div className="flex items-start justify-between gap-3">
										<div>
											<h3 className="text-base font-semibold text-slate-900 sm:text-lg">
												{p.name}
											</h3>
											<p className="mt-1 text-xs text-slate-500">
												{p.district}, {p.state}
											</p>
										</div>

										<div className="flex flex-col items-end gap-1">
											<span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
												{p.category}
											</span>
											{p.type && (
												<span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
													{p.type}
												</span>
											)}
										</div>
									</div>

									<p className="mt-3 line-clamp-3 text-sm text-slate-600">
										{p.address}
									</p>
								</figcaption>

								{/* Accent bar */}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#0f766e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</motion.figure>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

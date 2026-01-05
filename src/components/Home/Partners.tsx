"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
		name: "Jayanthi Hospitals (super speciality)",
		category: "Hospital",
		type: "Private",
		address:
			"7-1-621/11A, Near Umesh Chandra Statue, SR Nagar, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Sahini Ortho & Spine Clinic",
		category: "Hospital",
		type: "Private",
		address:
			"101, D.No: 49511 Ground Floor, Suguna Seetha Rama Nilayam,Lalitha Naga, Behind Daliraju Super Market, Srinivasa Nagar, Visakhapatnam-530016, Andhra Pradesh",
		logo: defaultLogo,
		state: "Andhra Pradesh",
		district: "Visakhapatnam",
	},
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
		name: "Satya Dental Clinic",
		category: "Dental",
		type: "Private",
		address: "30-5-587/A, 6/15, Brodipet ,Guntur - 522 002, Andhra Pradesh",
		logo: defaultLogo,
		state: "Andhra Pradesh",
		district: "Guntur",
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
		name: "Metro Health Care (Mitta Exellence)",
		category: "Diagnostics",
		type: "Private",
		address: "LB Nagar Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Metro Health Care (Mitta Exellence)",
		category: "Diagnostics",
		type: "Private",
		address: "Ameerpet Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Metro Health Care (Mitta Exellence)",
		category: "Diagnostics",
		type: "Private",
		address: "Miyapur Metro Station, Hyderabad, Telangana",
		logo: defaultLogo,
		state: "Telangana",
		district: "Hyderabad",
	},
	{
		name: "Metro Health Care (Mitta Exellence)",
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
		name: "Sri Laxmi Medical & General Stores",
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

type Category = (typeof categories)[number];
type ViewMode = "grid" | "list";

function cx(...classes: Array<string | false | undefined | null>) {
	return classes.filter(Boolean).join(" ");
}

function mapLink(address: string) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		address
	)}`;
}

function Chip({
	active,
	children,
	onClick,
}: {
	active?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cx(
				"whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm",
				active
					? "border-[#045e5a] bg-[#045e5a] text-white shadow-sm"
					: "border-slate-200 text-slate-600 hover:border-[#045e5a]/40 hover:bg-[#045e5a]/5"
			)}>
			{children}
		</button>
	);
}

function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
			{children}
		</span>
	);
}

function SubBadge({ children }: { children: React.ReactNode }) {
	return (
		<span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
			{children}
		</span>
	);
}

function GridCard({ p, index }: { p: Partner; index: number }) {
	return (
		<motion.figure
			initial={{ opacity: 0, y: 14 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{
				duration: 0.32,
				delay: Math.min(index, 12) * 0.03,
				ease: "easeOut",
			}}
			className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#045e5a]/60 hover:shadow-lg">
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
					<div className="min-w-0 flex-1">
						<h3 className="text-base font-semibold text-slate-900 sm:text-lg whitespace-normal break-words line-clamp-2">
							{p.name}
						</h3>
						<p className="mt-1 text-xs text-slate-500 whitespace-normal break-words">
							{p.district}, {p.state}
						</p>
					</div>

					<div className="flex shrink-0 flex-col items-end gap-1">
						<Badge>{p.category}</Badge>
						{p.type ? <SubBadge>{p.type}</SubBadge> : null}
					</div>
				</div>

				<p className="mt-3 text-sm text-slate-600 whitespace-normal break-words line-clamp-4">
					{p.address}
				</p>

				<div className="mt-4">
					<a
						href={mapLink(p.address)}
						target="_blank"
						rel="noreferrer"
						className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
						Directions
					</a>
				</div>
			</figcaption>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#0f766e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</motion.figure>
	);
}

function ListRow({ p }: { p: Partner }) {
	return (
		<div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-start gap-4">
				<div className="relative h-12 w-16 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
					<Image
						src={p.logo || defaultLogo}
						alt={`${p.name} logo`}
						fill
						sizes="64px"
						className="object-contain p-2"
					/>
				</div>

				<div className="min-w-0">
					<div className="flex flex-wrap items-start gap-2">
						<p className="text-sm font-semibold text-slate-900 sm:text-base whitespace-normal break-words line-clamp-2">
							{p.name}
						</p>
						<Badge>{p.category}</Badge>
						{p.type ? <SubBadge>{p.type}</SubBadge> : null}
					</div>

					<p className="mt-1 text-xs text-slate-500 whitespace-normal break-words">
						{p.district}, {p.state}
					</p>

					<p className="mt-1 text-sm text-slate-600 whitespace-normal break-words line-clamp-2">
						{p.address}
					</p>
				</div>
			</div>

			<div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
				<a
					href={mapLink(p.address)}
					target="_blank"
					rel="noreferrer"
					className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
					Directions
				</a>
			</div>
		</div>
	);
}

export default function Partners() {
	const [selectedCategory, setSelectedCategory] = useState<Category>("All");
	const [selectedState, setSelectedState] = useState("All");
	const [selectedDistrict, setSelectedDistrict] = useState("All");
	const [q, setQ] = useState("");
	const [view, setView] = useState<ViewMode>("grid");
	const [limit, setLimit] = useState(18);

	const [openDistricts, setOpenDistricts] = useState<Record<string, boolean>>(
		{}
	);

	const states = useMemo(
		() => ["All", ...Array.from(new Set(partners.map((p) => p.state)))],
		[]
	);

	const districts = useMemo(() => {
		const filtered =
			selectedState === "All"
				? partners
				: partners.filter((p) => p.state === selectedState);

		return ["All", ...Array.from(new Set(filtered.map((p) => p.district)))];
	}, [selectedState]);

	useEffect(() => {
		setLimit(18);
	}, [selectedCategory, selectedState, selectedDistrict, q, view]);

	const filteredPartners = useMemo(() => {
		const query = q.trim().toLowerCase();

		return partners.filter((p) => {
			const matchCategory =
				selectedCategory === "All" || p.category === selectedCategory;

			const matchState = selectedState === "All" || p.state === selectedState;

			const matchDistrict =
				selectedDistrict === "All" || p.district === selectedDistrict;

			const matchQuery =
				!query ||
				p.name.toLowerCase().includes(query) ||
				p.address.toLowerCase().includes(query) ||
				p.district.toLowerCase().includes(query) ||
				p.state.toLowerCase().includes(query);

			return matchCategory && matchState && matchDistrict && matchQuery;
		});
	}, [selectedCategory, selectedState, selectedDistrict, q]);

	const grouped = useMemo(() => {
		const map = new Map<string, Partner[]>();
		for (const p of filteredPartners) {
			const key = `${p.district}__${p.state}`;
			if (!map.has(key)) map.set(key, []);
			map.get(key)!.push(p);
		}

		return Array.from(map.entries())
			.map(([key, items]) => {
				const [district, state] = key.split("__");
				return { key, district, state, items };
			})
			.sort((a, b) => {
				const s = a.state.localeCompare(b.state);
				if (s !== 0) return s;
				return a.district.localeCompare(b.district);
			});
	}, [filteredPartners]);

	const quickCounts = useMemo(() => {
		const byCat = new Map<string, number>();
		const byDistrict = new Map<string, number>();

		for (const p of filteredPartners) {
			byCat.set(p.category, (byCat.get(p.category) || 0) + 1);
			byDistrict.set(p.district, (byDistrict.get(p.district) || 0) + 1);
		}

		const topDistricts = Array.from(byDistrict.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, 4);

		return { byCat, topDistricts };
	}, [filteredPartners]);

	const totalToShow = Math.min(limit, filteredPartners.length);

	const limitedGroups = useMemo(() => {
		let remaining = limit;
		const out: typeof grouped = [];

		for (const g of grouped) {
			if (remaining <= 0) break;
			const take = Math.min(remaining, g.items.length);
			out.push({ ...g, items: g.items.slice(0, take) });
			remaining -= take;
		}
		return out;
	}, [grouped, limit]);

	const canLoadMore = totalToShow < filteredPartners.length;

	return (
		<section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-100">
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,_#0f766e1a,_transparent_60%)]" />

			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				<div className="mx-auto max-w-3xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full bg-[#045e5a]/5 px-3 py-1 text-xs font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/15">
						<span className="h-1.5 w-1.5 rounded-full bg-[#0f766e]" />
						<span>ULHC Partner Network</span>
					</div>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Trusted Hospitals, Labs &amp; Pharmacies
					</h2>
					<p className="mt-3 text-sm text-slate-600 sm:text-base">
						Search, filter, and browse by district — built for large partner
						lists.
					</p>

					<div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-2 text-xs text-slate-600 shadow-sm ring-1 ring-slate-200/80 backdrop-blur">
						<span className="font-semibold text-slate-900">
							{filteredPartners.length}
						</span>
						<span>partners match your filters</span>
					</div>
				</div>

				{/* FILTERS */}
				<div className="mt-10 space-y-6 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm sm:p-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div className="w-full sm:max-w-md">
							<label className="mb-1 block text-xs font-medium text-slate-700">
								Search
							</label>
							<div className="relative">
								<input
									value={q}
									onChange={(e) => setQ(e.target.value)}
									placeholder="Search by name, address, district..."
									className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none focus:border-[#045e5a] focus:ring-2 focus:ring-[#045e5a]/20"
								/>
								{q ? (
									<button
										type="button"
										onClick={() => setQ("")}
										className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">
										Clear
									</button>
								) : null}
							</div>
						</div>

						<div className="flex items-center justify-between gap-3 sm:justify-end">
							<div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
								<button
									type="button"
									onClick={() => setView("grid")}
									className={cx(
										"rounded-lg px-3 py-2 text-xs font-semibold transition",
										view === "grid"
											? "bg-[#045e5a] text-white"
											: "text-slate-700 hover:bg-slate-50"
									)}>
									Grid
								</button>
								<button
									type="button"
									onClick={() => setView("list")}
									className={cx(
										"rounded-lg px-3 py-2 text-xs font-semibold transition",
										view === "list"
											? "bg-[#045e5a] text-white"
											: "text-slate-700 hover:bg-slate-50"
									)}>
									List
								</button>
							</div>

							<button
								type="button"
								onClick={() => {
									setSelectedCategory("All");
									setSelectedState("All");
									setSelectedDistrict("All");
									setQ("");
								}}
								className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
								Reset
							</button>
						</div>
					</div>

					<div className="relative">
						<div className="no-scrollbar flex gap-2 overflow-x-auto py-1">
							{categories.map((cat) => (
								<Chip
									key={cat}
									active={selectedCategory === cat}
									onClick={() => setSelectedCategory(cat)}>
									{cat}
									{cat !== "All" && quickCounts.byCat.get(cat)
										? ` (${quickCounts.byCat.get(cat)})`
										: ""}
								</Chip>
							))}
						</div>
						<div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/90 to-transparent" />
					</div>

					{quickCounts.topDistricts.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2">
							<span className="mr-1 text-xs font-semibold text-slate-600">
								Quick:
							</span>
							{quickCounts.topDistricts.map(([d, count]) => (
								<button
									key={d}
									type="button"
									onClick={() => setSelectedDistrict(d)}
									className={cx(
										"rounded-full border px-3 py-1.5 text-xs font-semibold transition",
										selectedDistrict === d
											? "border-[#045e5a] bg-[#045e5a]/10 text-[#045e5a]"
											: "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
									)}>
									{d} <span className="text-slate-500">({count})</span>
								</button>
							))}
						</div>
					)}

					<div className="flex flex-wrap items-center justify-center gap-4">
						<div className="flex flex-col text-xs text-slate-500">
							<span className="mb-1 font-medium text-slate-700">State</span>
							<select
								value={selectedState}
								onChange={(e) => {
									setSelectedState(e.target.value);
									setSelectedDistrict("All");
								}}
								className="w-56 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-[#045e5a] focus:outline-none focus:ring-2 focus:ring-[#045e5a]/20">
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
								className="w-56 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-[#045e5a] focus:outline-none focus:ring-2 focus:ring-[#045e5a]/20">
								{districts.map((d) => (
									<option key={d} value={d}>
										{d}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* RESULTS */}
				{filteredPartners.length === 0 ? (
					<div className="mt-16 flex justify-center">
						<div className="max-w-md rounded-2xl bg-white/80 px-6 py-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
							<p className="text-sm font-medium text-slate-800">
								No partners found for this combination.
							</p>
							<p className="mt-2 text-xs">
								Try changing the filters or searching by another keyword.
							</p>
						</div>
					</div>
				) : (
					<div className="mt-10 space-y-8 lg:mt-14">
						{limitedGroups.map((g, gi) => {
							const title = `${g.district}, ${g.state}`;
							const isOpen = openDistricts[g.key] ?? (gi < 2 ? true : false);

							return (
								<div
									key={g.key}
									className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm ring-1 ring-slate-100 backdrop-blur-sm sm:p-5">
									<button
										type="button"
										onClick={() =>
											setOpenDistricts((prev) => ({
												...prev,
												[g.key]: !isOpen,
											}))
										}
										className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm hover:bg-slate-50">
										<div className="min-w-0 flex-1">
											<p className="text-sm font-semibold text-slate-900 whitespace-normal break-words">
												{title}
											</p>
											<p className="mt-0.5 text-xs text-slate-500">
												{g.items.length} partner
												{g.items.length === 1 ? "" : "s"} in this section
											</p>
										</div>

										<div className="flex items-center gap-2">
											<span className="rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a] ring-1 ring-[#045e5a]/15">
												{g.items.length}
											</span>
											<span className="text-xs font-semibold text-slate-600">
												{isOpen ? "Hide" : "Show"}
											</span>
										</div>
									</button>

									<AnimatePresence initial={false}>
										{isOpen && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2, ease: "easeOut" }}
												className="overflow-hidden">
												<div className="mt-4">
													{view === "grid" ? (
														<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
															{g.items.map((p, i) => (
																<GridCard
																	key={`${p.name}-${g.key}-${i}`}
																	p={p}
																	index={i}
																/>
															))}
														</div>
													) : (
														<div className="space-y-3">
															{g.items.map((p, i) => (
																<ListRow
																	key={`${p.name}-${g.key}-${i}`}
																	p={p}
																/>
															))}
														</div>
													)}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							);
						})}

						<div className="flex flex-col items-center gap-3 pt-2">
							<p className="text-xs text-slate-600">
								Showing{" "}
								<span className="font-semibold text-slate-900">
									{totalToShow}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-900">
									{filteredPartners.length}
								</span>
							</p>

							{canLoadMore ? (
								<button
									type="button"
									onClick={() => setLimit((p) => p + 18)}
									className="rounded-xl bg-[#045e5a] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#045e5a]/95">
									Load more
								</button>
							) : (
								<span className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
									You’ve reached the end
								</span>
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

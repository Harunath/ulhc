"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Option = {
	id: string;
	name: string;
	stateId?: string;
};

type Partner = {
	id: string;
	name: string;
	isActive: boolean;
	address: string;
	category: Option;
	type: Option;
	state: Option;
	district: Option;
};

type Props = {
	partners: Partner[];
	categories: Option[];
	states: Option[];
	districts: Option[];
};

const DEFAULT_LOGO =
	"https://res.cloudinary.com/dk0smdu0d/image/upload/v1756834221/360_F_514364850_xLOQX6SOY2qcjAIcTowsi3xYvHmhmvs0_pystmg.jpg";

function cx(...classes: (string | false | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}

export default function PartnersPublic({
	partners = [],
	categories = [],
	states = [],
	districts = [],
}: Props) {
	const [q, setQ] = useState("");
	const [categoryId, setCategoryId] = useState("all");
	const [stateId, setStateId] = useState("all");
	const [districtId, setDistrictId] = useState("all");

	const filteredDistricts = useMemo(() => {
		if (stateId === "all") return districts;
		return districts.filter((d) => d.stateId === stateId);
	}, [districts, stateId]);

	const filteredPartners = useMemo(() => {
		const query = q.trim().toLowerCase();

		return partners.filter((p) => {
			if (!p.isActive) return false;

			if (categoryId !== "all" && p.category.id !== categoryId) return false;
			if (stateId !== "all" && p.state.id !== stateId) return false;
			if (districtId !== "all" && p.district.id !== districtId) return false;

			if (
				query &&
				!p.name.toLowerCase().includes(query) &&
				!p.address.toLowerCase().includes(query) &&
				!p.district.name.toLowerCase().includes(query)
			) {
				return false;
			}

			return true;
		});
	}, [partners, q, categoryId, stateId, districtId]);

	const categoryCounts = useMemo(() => {
		const map = new Map<string, number>();
		for (const p of partners) {
			if (!p.isActive) continue;
			map.set(p.category.id, (map.get(p.category.id) || 0) + 1);
		}
		return map;
	}, [partners]);

	const quickDistricts = useMemo(() => {
		const map = new Map<string, number>();

		for (const p of filteredPartners) {
			map.set(p.district.id, (map.get(p.district.id) || 0) + 1);
		}

		return Array.from(map.entries())
			.sort((a, b) => b[1] - a[1])
			.slice(0, 4)
			.map(([id, count]) => ({
				id,
				name: districts.find((d) => d.id === id)?.name ?? "",
				count,
			}));
	}, [filteredPartners, districts]);

	return (
		<section className="mx-auto max-w-7xl mt-10 px-4 py-16">
			{/* FILTER CARD */}
			<div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 space-y-6">
				{/* Search */}
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-700">
						Search
					</label>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Search by name, address, district..."
						className="w-full max-w-md rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-[#045e5a] focus:ring-2 focus:ring-[#045e5a]/20"
					/>
				</div>

				{/* Category Pills */}
				<div className="flex flex-wrap gap-2">
					<CategoryPill
						active={categoryId === "all"}
						onClick={() => setCategoryId("all")}>
						All
					</CategoryPill>

					{categories.map((c) => (
						<CategoryPill
							key={c.id}
							active={categoryId === c.id}
							onClick={() => setCategoryId(c.id)}>
							{c.name}
							{categoryCounts.get(c.id) ? ` (${categoryCounts.get(c.id)})` : ""}
						</CategoryPill>
					))}
				</div>

				{/* Quick Districts */}
				{quickDistricts.length > 0 && (
					<div className="flex flex-wrap items-center gap-2 text-sm">
						<span className="font-semibold text-slate-500">Quick:</span>
						{quickDistricts.map((d) => (
							<button
								key={d.id}
								onClick={() => setDistrictId(d.id)}
								className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50">
								{d.name} ({d.count})
							</button>
						))}
					</div>
				)}

				{/* State / District */}
				<div className="flex flex-wrap gap-6">
					<Select
						label="State"
						value={stateId}
						onChange={(v) => {
							setStateId(v);
							setDistrictId("all");
						}}
						options={states}
					/>
					<Select
						label="District"
						value={districtId}
						onChange={setDistrictId}
						options={filteredDistricts}
					/>
				</div>
			</div>

			{/* RESULTS */}
			<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredPartners.map((p) => (
					<div
						key={p.id}
						className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 space-y-4">
						{/* Logo */}
						<div className="relative h-24 w-full rounded-xl bg-slate-50 ring-1 ring-slate-200">
							<Image
								src={DEFAULT_LOGO}
								alt={`${p.name} logo`}
								fill
								className="object-contain p-4"
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							/>
						</div>

						{/* Name */}
						<h3 className="font-semibold text-slate-900">{p.name}</h3>

						{/* Category */}
						<span className="inline-block rounded-full bg-[#045e5a]/10 px-3 py-1 text-xs font-semibold text-[#045e5a]">
							{p.category.name}
						</span>

						{/* Address */}
						<p className="text-sm text-slate-600">{p.address}</p>

						{/* Location */}
						<p className="text-xs text-slate-500">
							{p.district.name}, {p.state.name}
						</p>
					</div>
				))}
			</div>

			{filteredPartners.length === 0 && (
				<p className="mt-12 text-center text-slate-500">No partners found</p>
			)}
		</section>
	);
}

function CategoryPill({
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
			onClick={onClick}
			className={cx(
				"rounded-full px-4 py-2 text-sm font-medium border transition",
				active
					? "bg-[#045e5a] text-white border-[#045e5a]"
					: "border-slate-200 text-slate-600 hover:bg-slate-50",
			)}>
			{children}
		</button>
	);
}

function Select({
	label,
	value,
	onChange,
	options,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	options: Option[];
}) {
	return (
		<div className="flex flex-col gap-1">
			<label className="text-sm text-slate-600">{label}</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-64 rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:border-[#045e5a] focus:ring-2 focus:ring-[#045e5a]/20">
				<option value="all">All</option>
				{options.map((o) => (
					<option key={o.id} value={o.id}>
						{o.name}
					</option>
				))}
			</select>
		</div>
	);
}

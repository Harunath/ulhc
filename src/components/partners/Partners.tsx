"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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

type PartnersProps = {
	partners: Partner[];
	categories: Option[];
	types: Option[];
	states: Option[];
	districts: Option[];
};

/* ----------------------------------
 Component
---------------------------------- */

export default function Partners({
	partners,
	categories,
	types,
	states,
	districts,
}: PartnersProps) {
	const [categoryId, setCategoryId] = useState<string>("all");
	const [typeId, setTypeId] = useState<string>("all");
	const [stateId, setStateId] = useState<string>("all");
	const [districtId, setDistrictId] = useState<string>("all");

	const filteredPartners = useMemo(() => {
		return partners.filter((p) => {
			if (categoryId !== "all" && p.category.id !== categoryId) return false;

			if (typeId !== "all" && p.type.id !== typeId) return false;

			if (stateId !== "all" && p.state.id !== stateId) return false;

			if (districtId !== "all" && p.district.id !== districtId) return false;

			return true;
		});
	}, [partners, categoryId, typeId, stateId, districtId]);

	return (
		<div className="space-y-6 p-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Partners</h1>

				<Link
					href="/admin/partners/new-partner"
					className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
					+ Add Partner
				</Link>
				<Link
					href="/admin/partners/create-state"
					className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
					+ Create States
				</Link>
				<Link
					href="/admin/partners/create-district"
					className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
					+ Create Districts
				</Link>
				<Link
					href="/admin/partners/partner-category"
					className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
					+ Add Partner category
				</Link>
			</div>

			{/* FILTERS */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
				<Select
					label="Category"
					value={categoryId}
					onChange={setCategoryId}
					options={categories}
				/>
				<Select
					label="Type"
					value={typeId}
					onChange={setTypeId}
					options={types}
				/>
				<Select
					label="State"
					value={stateId}
					onChange={setStateId}
					options={states}
				/>
				<Select
					label="District"
					value={districtId}
					onChange={setDistrictId}
					options={districts.filter(
						(d) => stateId === "all" || d.stateId === stateId,
					)}
				/>
			</div>

			{/* TABLE */}
			<div className="overflow-x-auto rounded-lg border bg-white">
				<table className="w-full text-sm">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="p-3">Name</th>
							<th className="p-3">Category</th>
							<th className="p-3">Type</th>
							<th className="p-3">Address</th>
							<th className="p-3">Location</th>
							<th className="p-3">Status</th>
							<th className="p-3"></th>
						</tr>
					</thead>
					<tbody>
						{filteredPartners.map((p) => (
							<tr key={p.id} className="border-t align-top">
								<td className="p-3 font-medium">{p.name}</td>
								<td className="p-3">{p.category.name}</td>
								<td className="p-3">{p.type.name}</td>

								<td className="max-w-xs whitespace-normal p-3 text-gray-700">
									{p.address || <span className="text-gray-400">—</span>}
								</td>

								<td className="p-3">
									{p.state.name}, {p.district.name}
								</td>

								<td className="p-3">
									<span
										className={`rounded-full px-2 py-0.5 text-xs ${
											p.isActive
												? "bg-green-100 text-green-700"
												: "bg-gray-100 text-gray-600"
										}`}>
										{p.isActive ? "Active" : "Inactive"}
									</span>
								</td>

								<td className="p-3">
									<Link
										href={`/admin/partners/${p.id}`}
										className="text-blue-600 hover:underline">
										View / Edit
									</Link>
								</td>
							</tr>
						))}

						{filteredPartners.length === 0 && (
							<tr>
								<td colSpan={7} className="p-6 text-center text-gray-500">
									No partners found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

/* ----------------------------------
 Select Component
---------------------------------- */

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
		<div>
			<label className="mb-1 block text-sm">{label}</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full rounded-lg border px-3 py-2">
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

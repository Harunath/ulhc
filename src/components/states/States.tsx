"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type State = {
	id: string;
	name: string;
	code?: string | null;
	priority: number;
	isActive: boolean;
};

type Props = {
	states: State[];
};

export default function States({ states }: Props) {
	const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

	const filteredStates = useMemo(() => {
		if (!states || states.length === 0) return [];

		return states.filter((s) => {
			const isActive = Boolean(s.isActive); // 🔑 normalize

			if (status === "active") return isActive;
			if (status === "inactive") return !isActive;
			return true;
		});
	}, [states, status]);

	return (
		<div className="space-y-6 p-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">States</h1>

				<div className="flex gap-3">
					<Link
						href="/admin/partners/create-state"
						className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">
						+ Create State
					</Link>

					<Link
						href="/admin/partners/create-district"
						className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
						+ Create Districts
					</Link>
				</div>
			</div>

			{/* Filters */}
			<div className="flex gap-4">
				<Select
					label="Status"
					value={status}
					onChange={setStatus}
					options={[
						{ id: "all", name: "All" },
						{ id: "active", name: "Active" },
						{ id: "inactive", name: "Inactive" },
					]}
				/>
			</div>

			{/* Table */}
			<div className="overflow-x-auto rounded-lg border bg-white">
				<table className="w-full text-sm">
					<thead className="bg-gray-100 text-left">
						<tr>
							<th className="p-3">Name</th>
							<th className="p-3">Code</th>
							<th className="p-3">Priority</th>
							<th className="p-3">Status</th>
							<th className="p-3"></th>
						</tr>
					</thead>

					<tbody>
						{/* 🚫 No data at all */}
						{states.length === 0 && (
							<tr>
								<td colSpan={5} className="p-6 text-center text-gray-500">
									No states created yet
								</td>
							</tr>
						)}

						{/* 🚫 Filtered out */}
						{states.length > 0 && filteredStates.length === 0 && (
							<tr>
								<td colSpan={5} className="p-6 text-center text-gray-500">
									No states match the selected filter
								</td>
							</tr>
						)}

						{/* ✅ Data */}
						{filteredStates.map((s) => (
							<tr key={s.id} className="border-t">
								<td className="p-3 font-medium">{s.name}</td>

								<td className="p-3 text-gray-600">{s.code || "—"}</td>

								<td className="p-3">{s.priority}</td>

								<td className="p-3">
									<span
										className={`rounded-full px-2 py-0.5 text-xs ${
											s.isActive
												? "bg-green-100 text-green-700"
												: "bg-gray-100 text-gray-600"
										}`}>
										{s.isActive ? "Active" : "Inactive"}
									</span>
								</td>

								<td className="p-3 text-right">
									<Link
										href={`/admin/states/${s.id}`}
										className="text-blue-600 hover:underline">
										View / Edit
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

/* ---------------- Select ---------------- */

function Select<T extends string>({
	label,
	value,
	onChange,
	options,
}: {
	label: string;
	value: T;
	onChange: (v: T) => void;
	options: { id: T; name: string }[];
}) {
	return (
		<div>
			<label className="mb-1 block text-sm">{label}</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value as T)}
				className="w-48 rounded-lg border px-3 py-2">
				{options.map((o) => (
					<option key={o.id} value={o.id}>
						{o.name}
					</option>
				))}
			</select>
		</div>
	);
}

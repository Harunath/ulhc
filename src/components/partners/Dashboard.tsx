"use client";

import { useState } from "react";

type Partner = {
	id: string;
	name: string;
	isActive: boolean;
	category: { name: string };
	state: { name: string };
};

type Stats = {
	totalPartners: number;
	activePartners: number;
	inactivePartners: number;
	totalCategories: number;
	totalTypes: number;
	totalStates: number;
	totalDistricts: number;
};

type View =
	| "none"
	| "partners"
	| "active"
	| "inactive"
	| "categories"
	| "types"
	| "states"
	| "districts"
	| "recent";

export default function Dashboard({
	stats,
	recentPartners,
}: {
	stats: Stats;
	recentPartners: Partner[];
}) {
	const [view, setView] = useState<View>("none");

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
				<p className="text-gray-600">System overview & interactive insights</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<KpiCard
					label="Total Partners"
					value={stats.totalPartners}
					color="bg-blue-50 text-blue-700"
					onClick={() => setView("partners")}
				/>
				<KpiCard
					label="Active Partners"
					value={stats.activePartners}
					color="bg-green-50 text-green-700"
					onClick={() => setView("active")}
				/>
				<KpiCard
					label="Inactive Partners"
					value={stats.inactivePartners}
					color="bg-gray-100 text-gray-700"
					onClick={() => setView("inactive")}
				/>
				<KpiCard
					label="Partner Categories"
					value={stats.totalCategories}
					color="bg-purple-50 text-purple-700"
					onClick={() => setView("categories")}
				/>
				<KpiCard
					label="Partner Types"
					value={stats.totalTypes}
					color="bg-indigo-50 text-indigo-700"
					onClick={() => setView("types")}
				/>
				<KpiCard
					label="States"
					value={stats.totalStates}
					color="bg-orange-50 text-orange-700"
					onClick={() => setView("states")}
				/>
				<KpiCard
					label="Districts"
					value={stats.totalDistricts}
					color="bg-yellow-50 text-yellow-700"
					onClick={() => setView("districts")}
				/>
				<KpiCard
					label="System Status"
					value="Healthy"
					color="bg-emerald-50 text-emerald-700"
				/>
			</div>

			{/* DETAILS PANEL */}
			<div className="rounded-xl bg-white shadow">
				<div className="border-b px-5 py-4 flex justify-between items-center">
					<h3 className="text-sm font-semibold text-gray-900">
						{view === "none" ? "Details" : `Viewing ${view.replace("-", " ")}`}
					</h3>

					{view !== "none" && (
						<button
							onClick={() => setView("none")}
							className="text-xs text-blue-600 hover:underline">
							Clear
						</button>
					)}
				</div>

				<div className="p-5">
					{view === "none" && (
						<p className="text-sm text-gray-500">
							Click any stat card above to view details.
						</p>
					)}

					{(view === "partners" ||
						view === "active" ||
						view === "inactive" ||
						view === "recent") && <PartnerTable partners={recentPartners} />}

					{view === "categories" && (
						<Info text="Manage partner categories from admin panel." />
					)}

					{view === "types" && (
						<Info text="Manage partner types from admin panel." />
					)}

					{view === "states" && (
						<Info text="States configured in the system." />
					)}

					{view === "districts" && (
						<Info text="Districts mapped under states." />
					)}
				</div>
			</div>
		</div>
	);
}

/* ---------------- Components ---------------- */

function KpiCard({
	label,
	value,
	color,
	onClick,
}: {
	label: string;
	value: number | string;
	color: string;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`rounded-xl p-4 shadow hover:shadow-md transition text-left ${color}`}>
			<p className="text-sm opacity-80">{label}</p>
			<p className="text-2xl font-bold">{value}</p>
		</button>
	);
}

function PartnerTable({ partners }: { partners: Partner[] }) {
	return (
		<table className="w-full text-sm">
			<thead className="text-gray-500">
				<tr>
					<th className="pb-2 text-left">Name</th>
					<th className="pb-2 text-left">Category</th>
					<th className="pb-2 text-left">State</th>
					<th className="pb-2 text-left">Status</th>
				</tr>
			</thead>
			<tbody>
				{partners.map((p) => (
					<tr key={p.id} className="border-t">
						<td className="py-2 font-medium">{p.name}</td>
						<td>{p.category.name}</td>
						<td>{p.state.name}</td>
						<td>
							<span
								className={`text-xs px-2 py-0.5 rounded-full ${
									p.isActive
										? "bg-green-100 text-green-700"
										: "bg-gray-100 text-gray-600"
								}`}>
								{p.isActive ? "Active" : "Inactive"}
							</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function Info({ text }: { text: string }) {
	return <p className="text-sm text-gray-600">{text}</p>;
}

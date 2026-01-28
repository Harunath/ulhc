"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type District = {
	id: string;
	name: string;
	code?: string | null;
	priority: number;
	isActive: boolean;
};

type Props = {
	stateid: string;
};

export default function DistrictList({ stateid }: Props) {
	const router = useRouter();
	const [districts, setDistricts] = useState<District[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDistricts = async () => {
			try {
				const res = await fetch(`/api/admin/states/${stateid}/district`);
				if (!res.ok) throw new Error();
				setDistricts(await res.json());
			} catch {
				setDistricts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchDistricts();
	}, [stateid]);

	if (loading) {
		return <p className="text-sm text-gray-500">Loading districts…</p>;
	}

	return (
		<div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">Districts</h3>

				<button
					onClick={() =>
						router.push(`/admin/partners/create-district?stateId=${stateid}`)
					}
					className="text-sm text-blue-600 hover:underline">
					+ Add District
				</button>
			</div>

			{districts.length === 0 ? (
				<p className="text-sm text-gray-500">
					No districts added for this state
				</p>
			) : (
				<div className="overflow-x-auto rounded-lg border">
					<table className="w-full text-sm">
						<thead className="bg-gray-100 text-left">
							<tr>
								<th className="p-3">Name</th>
								<th className="p-3">Code</th>
								<th className="p-3">Priority</th>
								<th className="p-3">Status</th>
								<th className="p-3 text-right">Action</th>
							</tr>
						</thead>

						<tbody>
							{districts.map((d) => (
								<tr key={d.id} className="border-t">
									<td className="p-3 font-medium">{d.name}</td>
									<td className="p-3 text-gray-600">{d.code || "—"}</td>
									<td className="p-3">{d.priority}</td>
									<td className="p-3">
										<span
											className={`rounded-full px-2 py-0.5 text-xs ${
												d.isActive
													? "bg-green-100 text-green-700"
													: "bg-gray-100 text-gray-600"
											}`}>
											{d.isActive ? "Active" : "Inactive"}
										</span>
									</td>
									<td className="p-3 text-right">
										<button
											onClick={() =>
												router.push(
													`/admin/states/${stateid}/districts/${d.id}`,
												)
											}
											className="text-blue-600 hover:underline text-sm">
											View / Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

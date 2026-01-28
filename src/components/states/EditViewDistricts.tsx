"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* ---------------- Schema ---------------- */

const UpdateDistrictSchema = z.object({
	name: z.string().min(2, "District name is required"),
	code: z.string().optional().nullable(),
	priority: z.number().int().min(0),
	isActive: z.boolean(),
});

type DistrictFormData = z.infer<typeof UpdateDistrictSchema>;
type Mode = "view" | "edit";

/* ---------------- Props ---------------- */

type Props = {
	params: {
		stateid: string;
		districtid: string;
	};
};

/* ===================== Component ===================== */

export default function EditViewDistricts({ params }: Props) {
	const { stateid, districtid } = params;
	const router = useRouter();

	const [mode, setMode] = useState<Mode>("view");
	const isView = mode === "view";

	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);

	const [originalData, setOriginalData] = useState<DistrictFormData | null>(
		null,
	);

	const [form, setForm] = useState<DistrictFormData>({
		name: "",
		code: null,
		priority: 0,
		isActive: true,
	});

	/* ---------------- Fetch District ---------------- */

	useEffect(() => {
		const fetchDistrict = async () => {
			try {
				const res = await fetch(
					`/api/admin/states/${stateid}/district/${districtid}`,
				);
				if (!res.ok) throw new Error();

				const data = await res.json();

				const formatted: DistrictFormData = {
					name: data.name ?? "",
					code: data.code ?? null,
					priority: data.priority ?? 0,
					isActive: data.isActive ?? true,
				};

				setForm(formatted);
				setOriginalData(formatted);
			} catch {
				toast.error("Failed to load district");
				router.push(`/admin/states/${stateid}`);
			} finally {
				setInitialLoading(false);
			}
		};

		fetchDistrict();
	}, [stateid, districtid, router]);

	/* ---------------- Helpers ---------------- */

	const isDirty = JSON.stringify(form) !== JSON.stringify(originalData);

	/* ---------------- Handlers ---------------- */

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: name === "priority" ? Number(value) : value,
		}));
	};

	const toggleActive = () => {
		setForm((prev) => ({
			...prev,
			isActive: !prev.isActive,
		}));
	};

	const handleSave = async () => {
		const parsed = UpdateDistrictSchema.safeParse(form);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(
				`/api/admin/states/${stateid}/district/${districtid}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(parsed.data),
				},
			);

			if (!res.ok) throw new Error();

			toast.success("District updated");
			setOriginalData(form);
			setMode("view");
			router.refresh();
		} catch {
			toast.error("Failed to update district");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		if (originalData) setForm(originalData);
		setMode("view");
	};

	if (initialLoading) {
		return <p className="p-6 text-sm">Loading district…</p>;
	}

	/* ---------------- UI ---------------- */

	return (
		<div className="max-w-2xl rounded-2xl border bg-white p-8 shadow-md space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">
					{isView ? "District Details" : "Edit District"}
				</h2>

				{isView && (
					<button
						onClick={() => setMode("edit")}
						className="rounded-lg border px-5 py-2 text-sm hover:bg-gray-50">
						Edit
					</button>
				)}
			</div>

			<BigInput
				label="District Name"
				name="name"
				value={form.name}
				disabled={isView}
				onChange={handleChange}
			/>

			<BigInput
				label="Code"
				name="code"
				value={form.code ?? ""}
				disabled={isView}
				onChange={handleChange}
			/>

			<BigInput
				label="Priority"
				name="priority"
				type="number"
				value={String(form.priority)}
				disabled={isView}
				onChange={handleChange}
			/>

			{/* Status */}
			<div className="space-y-2">
				<label className="text-sm font-medium">Status</label>

				{isView ? (
					<input
						disabled
						value={form.isActive ? "Active" : "Inactive"}
						className="w-full rounded-xl border px-4 py-3 bg-gray-50"
					/>
				) : (
					<button
						type="button"
						onClick={toggleActive}
						className={`w-full rounded-xl border px-4 py-3 text-left font-medium ${
							form.isActive
								? "bg-green-50 border-green-400 text-green-700"
								: "bg-red-50 border-red-400 text-red-700"
						}`}>
						{form.isActive ? "Active" : "Inactive"}
					</button>
				)}
			</div>

			{/* Actions */}
			{!isView && (
				<div className="flex gap-4 pt-4">
					<button
						onClick={handleSave}
						disabled={loading || !isDirty}
						className="flex-1 rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
						{loading ? "Saving…" : "Save"}
					</button>

					<button
						onClick={handleCancel}
						className="flex-1 rounded-lg border py-3">
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}

/* ---------------- UI Helper ---------------- */

type BigInputProps = {
	label: string;
	name: keyof DistrictFormData;
	value: string;
	type?: string;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BigInput = ({
	label,
	name,
	value,
	type = "text",
	disabled = false,
	onChange,
}: BigInputProps) => (
	<div className="space-y-2">
		<label className="text-sm font-medium">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			className={`w-full rounded-xl border px-4 py-3 ${
				disabled ? "bg-gray-50" : "bg-white"
			}`}
		/>
	</div>
);

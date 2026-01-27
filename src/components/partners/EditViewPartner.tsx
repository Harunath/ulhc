"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { PartnerSchema } from "@/lib/types/Partner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { District } from "@prisma/client";

type Option = { id: string; name: string };

type Props = {
	id: string;
	categories: Option[];
	types: Option[];
	states: Option[];
};

type PartnerFormData = z.infer<typeof PartnerSchema>;
type Mode = "view" | "edit";

/* ===================== Component ===================== */

const EditViewPartner = ({ id, categories, types, states }: Props) => {
	const router = useRouter();
	const [mode, setMode] = useState<Mode>("view");
	const isView = mode === "view";

	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [districts, setDistricts] = useState<District[]>([]);
	const [originalData, setOriginalData] = useState<PartnerFormData | null>(
		null,
	);

	const [form, setForm] = useState<PartnerFormData>({
		name: "",
		categoryId: "",
		typeId: "",
		stateId: "",
		districtId: "",
		address: "",
		logoUrl: null,
		isActive: true,
	});

	/* ---------------- Fetch Partner ---------------- */
	useEffect(() => {
		const fetchPartner = async () => {
			try {
				const res = await fetch(`/api/admin/partners/${id}`);
				if (!res.ok) throw new Error();

				const data = await res.json();

				const formatted: PartnerFormData = {
					name: data.name ?? "",
					categoryId: data.categoryId ?? "",
					typeId: data.typeId ?? "",
					stateId: data.stateId ?? "",
					districtId: data.districtId ?? "",
					address: data.address ?? "",
					logoUrl: data.logoUrl ?? null,
					isActive: data.isActive ?? true,
				};

				setForm(formatted);
				setOriginalData(formatted);
			} catch {
				toast.error("Failed to load partner");
				router.push("/admin/partners");
			} finally {
				setInitialLoading(false);
			}
		};

		fetchPartner();
	}, [id, router]);

	/* ---------------- Fetch Districts ---------------- */
	useEffect(() => {
		if (!form.stateId) return;

		const fetchDistricts = async () => {
			try {
				const res = await fetch(`/api/admin/states/${form.stateId}/district`);
				if (!res.ok) throw new Error();
				setDistricts(await res.json());
			} catch {
				setDistricts([]);
			}
		};

		fetchDistricts();
	}, [form.stateId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
			...(name === "stateId" ? { districtId: "" } : {}),
		}));
	};

	const handleToggleActive = () => {
		setForm((prev) => ({ ...prev, isActive: !prev.isActive }));
	};

	const handleSave = async () => {
		if (!PartnerSchema.safeParse(form).success) return;

		setLoading(true);
		try {
			const res = await fetch(`/api/admin/partners/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			if (!res.ok) throw new Error();

			toast.success("Partner updated");
			setOriginalData(form);
			setMode("view");
			router.refresh();
		} catch {
			toast.error("Update failed");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		if (originalData) setForm(originalData);
		setMode("view");
	};

	if (initialLoading) return <p className="p-6 text-sm">Loading...</p>;

	return (
		<div className="max-w-3xl rounded-2xl border bg-white p-10 shadow-md space-y-7">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">
					{isView ? "Partner Details" : "Edit Partner"}
				</h2>
				{isView && (
					<button
						onClick={() => setMode("edit")}
						className="rounded-lg border px-5 py-2 text-sm hover:bg-gray-50">
						Edit
					</button>
				)}
			</div>

			{/* Fields */}
			<BigInput
				label="Partner Name"
				name="name"
				value={form.name}
				disabled={isView}
				onChange={handleChange}
			/>

			<BigSelect
				label="Category"
				name="categoryId"
				value={form.categoryId}
				disabled={isView}
				options={categories}
				onChange={handleChange}
			/>

			<BigSelect
				label="Partner Type"
				name="typeId"
				value={form.typeId}
				disabled={isView}
				options={types}
				onChange={handleChange}
			/>

			<BigSelect
				label="State"
				name="stateId"
				value={form.stateId}
				disabled={isView}
				options={states}
				onChange={handleChange}
			/>

			<BigSelect
				label="District"
				name="districtId"
				value={form.districtId}
				disabled={isView}
				options={districts}
				onChange={handleChange}
			/>

			<BigInput
				label="Address"
				name="address"
				value={form.address}
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
						className="w-full rounded-xl border px-4 py-3 bg-gray-50 text-gray-800"
					/>
				) : (
					<button
						type="button"
						onClick={handleToggleActive}
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
				<div className="flex gap-4 pt-6">
					<button
						onClick={handleSave}
						disabled={loading}
						className="flex-1 rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700">
						{loading ? "Saving..." : "Save"}
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
};

/* ===================== Typed UI Components ===================== */

type BigInputProps = {
	label: string;
	name: keyof PartnerFormData;
	value: string;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BigInput = ({
	label,
	name,
	value,
	disabled = false,
	onChange,
}: BigInputProps) => (
	<div className="space-y-2">
		<label className="text-sm font-medium">{label}</label>
		<input
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			className={`w-full rounded-xl border px-4 py-3 text-base ${
				disabled ? "bg-gray-50 text-gray-800" : "bg-white"
			}`}
		/>
	</div>
);

type BigSelectProps<T extends { id: string; name: string }> = {
	label: string;
	name: keyof PartnerFormData;
	value: string;
	disabled?: boolean;
	options: T[];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BigSelect = <T extends { id: string; name: string }>({
	label,
	name,
	value,
	disabled = false,
	options,
	onChange,
}: BigSelectProps<T>) => (
	<div className="space-y-2">
		<label className="text-sm font-medium">{label}</label>

		{disabled ? (
			<input
				disabled
				value={options.find((o) => o.id === value)?.name || ""}
				className="w-full rounded-xl border px-4 py-3 bg-gray-50 text-gray-800"
			/>
		) : (
			<select
				name={name}
				value={value}
				onChange={onChange}
				className="w-full rounded-xl border px-4 py-3 bg-white text-base">
				<option value="">Select {label.toLowerCase()}</option>
				{options.map((o) => (
					<option key={o.id} value={o.id}>
						{o.name}
					</option>
				))}
			</select>
		)}
	</div>
);

export default EditViewPartner;

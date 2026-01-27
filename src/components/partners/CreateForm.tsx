"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { PartnerSchema } from "@/lib/types/Partner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type { District } from "@prisma/client";

type Option = {
	id: string;
	name: string;
};

type Props = {
	categories: Option[];
	types: Option[];
	states: Option[];
};

type PartnerFormData = z.infer<typeof PartnerSchema>;

const CreateForm = ({ categories, types, states }: Props) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [districts, setDistricts] = useState<District[]>([]);

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

	const toggleActive = () => {
		setForm((prev) => ({ ...prev, isActive: !prev.isActive }));
	};

	const validate = () => {
		const result = PartnerSchema.safeParse(form);

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			result.error.issues.forEach((issue) => {
				const key = issue.path[0];
				if (key) fieldErrors[key.toString()] = issue.message;
			});
			setErrors(fieldErrors);
			return false;
		}

		setErrors({});
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setLoading(true);

		try {
			const res = await fetch("/api/admin/partners", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data?.error || "Failed to create partner");
				return;
			}

			toast.success("Partner created successfully");
			router.push("/admin/partners");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const fetchDistricts = async () => {
		setLoading(true);
		if (!form.stateId) {
			setDistricts([]);
			return;
		}

		try {
			const res = await fetch(`/api/admin/states/${form.stateId}/district`);
			if (!res.ok) throw new Error("Failed to fetch districts");

			const data = await res.json();
			setDistricts(data ?? []);
		} catch {
			setDistricts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDistricts();
	}, [form.stateId]);

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-2xl rounded-2xl border border-gray-300 bg-white p-8 shadow-md space-y-6">
			<h2 className="text-xl font-semibold text-gray-900">
				Create New Partner
			</h2>

			{/* Partner Name */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">
					Partner Name
				</label>
				<input
					name="name"
					value={form.name}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base"
				/>
				{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
			</div>

			{/* Category */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">Category</label>
				<select
					name="categoryId"
					value={form.categoryId}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base">
					<option value="">Select category</option>
					{categories.map((c) => (
						<option key={c.id} value={c.id}>
							{c.name}
						</option>
					))}
				</select>
				{errors.categoryId && (
					<p className="text-sm text-red-600">{errors.categoryId}</p>
				)}
			</div>

			{/* Partner Type */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">
					Partner Type
				</label>
				<select
					name="typeId"
					value={form.typeId}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base">
					<option value="">Select type</option>
					{types.map((t) => (
						<option key={t.id} value={t.id}>
							{t.name}
						</option>
					))}
				</select>
				{errors.typeId && (
					<p className="text-sm text-red-600">{errors.typeId}</p>
				)}
			</div>

			{/* State */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">State</label>
				<select
					name="stateId"
					value={form.stateId}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base">
					<option value="">Select state</option>
					{states.map((s) => (
						<option key={s.id} value={s.id}>
							{s.name}
						</option>
					))}
				</select>
				{errors.stateId && (
					<p className="text-sm text-red-600">{errors.stateId}</p>
				)}
			</div>

			{/* District */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">District</label>
				<select
					name="districtId"
					value={form.districtId}
					onChange={handleChange}
					disabled={!form.stateId}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base disabled:bg-gray-100">
					<option value="">Select district</option>
					{districts.map((d) => (
						<option key={d.id} value={d.id}>
							{d.name}
						</option>
					))}
				</select>
				{errors.districtId && (
					<p className="text-sm text-red-600">{errors.districtId}</p>
				)}
			</div>

			{/* Address */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">Address</label>
				<input
					name="address"
					value={form.address}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base"
				/>
				{errors.address && (
					<p className="text-sm text-red-600">{errors.address}</p>
				)}
			</div>

			{/* Active / Inactive */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">Status</label>
				<button
					type="button"
					onClick={toggleActive}
					className={`w-full rounded-lg border px-4 py-3 text-left font-medium ${
						form.isActive
							? "bg-green-50 border-green-400 text-green-700"
							: "bg-red-50 border-red-400 text-red-700"
					}`}>
					{form.isActive ? "Active" : "Inactive"}
				</button>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
				{loading ? "Creating..." : "Create Partner"}
			</button>
		</form>
	);
};

export default CreateForm;

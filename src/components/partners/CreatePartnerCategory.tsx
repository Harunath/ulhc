"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* ---------- Helpers ---------- */
const slugify = (text: string) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");

/* ---------- Schema ---------- */
const PartnerCategorySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	slug: z.string().min(2),
	priority: z.number().int().min(0),
	isActive: z.boolean(),
});

type PartnerCategoryFormData = z.infer<typeof PartnerCategorySchema>;

const CreatePartnerCategory = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const [form, setForm] = useState<PartnerCategoryFormData>({
		name: "",
		slug: "",
		priority: 0,
		isActive: true,
	});

	/* ---------- Auto-generate slug ---------- */
	useEffect(() => {
		setForm((prev) => ({
			...prev,
			slug: slugify(prev.name),
		}));
	}, [form.name]);

	/* ---------- Handlers ---------- */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: name === "priority" ? Number(value) : value,
		}));
	};

	const toggleActive = () => {
		setForm((prev) => ({ ...prev, isActive: !prev.isActive }));
	};

	const validate = () => {
		const result = PartnerCategorySchema.safeParse(form);

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
			const res = await fetch("/api/admin/partners/partner-categories", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data?.error || "Failed to create partner category");
				return;
			}

			toast.success("Partner category created successfully");
			router.push("/admin/partners");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	/* ---------- UI ---------- */
	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-2xl rounded-2xl border border-gray-300 bg-white p-8 shadow-md space-y-6">
			<h2 className="text-xl font-semibold text-gray-900">
				Create Partner Category
			</h2>

			{/* Name */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">
					Category Name
				</label>
				<input
					name="name"
					value={form.name}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base"
				/>
				{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
			</div>

			{/* Slug (auto-generated) */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">Slug</label>
				<input
					value={form.slug}
					disabled
					className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-base text-gray-700"
				/>
			</div>

			{/* Priority */}
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">Priority</label>
				<input
					type="number"
					name="priority"
					value={form.priority}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base"
				/>
				{errors.priority && (
					<p className="text-sm text-red-600">{errors.priority}</p>
				)}
			</div>

			{/* Status */}
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

			{/* Submit */}
			<button
				type="submit"
				disabled={loading}
				className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
				{loading ? "Creating..." : "Create Partner Category"}
			</button>
		</form>
	);
};

export default CreatePartnerCategory;

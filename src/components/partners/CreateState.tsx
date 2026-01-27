"use client";

import React, { useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const StateSchema = z.object({
	name: z.string().min(2, "State name must be at least 2 characters"),
	code: z.string().optional().nullable(),
	priority: z.number().int().min(0),
	isActive: z.boolean(),
});

type StateFormData = z.infer<typeof StateSchema>;

const CreateState = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const [form, setForm] = useState<StateFormData>({
		name: "",
		code: "",
		priority: 0,
		isActive: true,
	});

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
		const result = StateSchema.safeParse(form);

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
			const res = await fetch("/api/admin/states", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data?.error || "Failed to create state");
				return;
			}

			toast.success("State created successfully");
			router.push("/admin/partners");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-2xl rounded-2xl border border-gray-300 bg-white p-8 shadow-md space-y-6">
			<h2 className="text-xl font-semibold text-gray-900">Create State</h2>
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">State Name</label>
				<input
					name="name"
					value={form.name}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base"
					placeholder="Enter state name"
				/>
				{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
			</div>
			<div className="space-y-1">
				<label className="text-sm font-medium text-gray-700">
					State Code (optional)
				</label>
				<input
					name="code"
					value={form.code ?? ""}
					onChange={handleChange}
					className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base"
					placeholder="e.g. TN, KA"
				/>
				{errors.code && <p className="text-sm text-red-600">{errors.code}</p>}
			</div>{" "}
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
				{loading ? "Creating..." : "Create State"}
			</button>
		</form>
	);
};

export default CreateState;

"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DistrictList from "@/components/states/DistrictList";

const UpdateStateSchema = z.object({
	name: z.string().min(2, "State name is required"),
	code: z.string().optional().nullable(),
	priority: z.number().int().min(0),
	isActive: z.boolean(),
});

type StateFormData = z.infer<typeof UpdateStateSchema>;
type Mode = "view" | "edit";

type Props = {
	stateid: string;
};

const EditState = ({ stateid }: Props) => {
	const router = useRouter();
	const [mode, setMode] = useState<Mode>("view");
	const isView = mode === "view";

	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);
	const [originalData, setOriginalData] = useState<StateFormData | null>(null);

	const [form, setForm] = useState<StateFormData>({
		name: "",
		code: null,
		priority: 0,
		isActive: true,
	});

	/* ---------------- Fetch State ---------------- */

	useEffect(() => {
		const fetchState = async () => {
			try {
				const res = await fetch(`/api/admin/states/${stateid}`);
				if (!res.ok) throw new Error();

				const data = await res.json();

				const formatted: StateFormData = {
					name: data.name ?? "",
					code: data.code ?? null,
					priority: data.priority ?? 0,
					isActive: data.isActive ?? true,
				};

				setForm(formatted);
				setOriginalData(formatted);
			} catch {
				toast.error("Failed to load state");
				router.push("/admin/partners/state");
			} finally {
				setInitialLoading(false);
			}
		};

		fetchState();
	}, [stateid, router]);

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
		const parsed = UpdateStateSchema.safeParse(form);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(`/api/admin/states/${stateid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(parsed.data),
			});

			if (!res.ok) throw new Error();

			toast.success("State updated");
			setOriginalData(form);
			setMode("view");
			router.refresh();
		} catch {
			toast.error("Failed to update state");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		if (originalData) setForm(originalData);
		setMode("view");
	};

	if (initialLoading) {
		return <p className="p-6 text-sm">Loading state…</p>;
	}

	return (
		<div className="max-w-2xl space-y-8">
			{/* ================= State ================= */}
			<div className="rounded-2xl border bg-white p-8 shadow-md space-y-6">
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-semibold">
						{isView ? "State Details" : "Edit State"}
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
					label="State Name"
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

			{/* ================= Districts ================= */}
			<DistrictList stateid={stateid} />
		</div>
	);
};

export default EditState;

/* ---------------- UI Helpers ---------------- */

type BigInputProps = {
	label: string;
	name: keyof StateFormData;
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

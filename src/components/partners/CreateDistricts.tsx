"use client";

import React, { useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";

/* ---------------- Schema ---------------- */

const DistrictSchema = z.object({
	name: z.string().min(2, "District name is required"),
	code: z.string().optional().nullable(),
	priority: z.number().int().min(0),
	isActive: z.boolean(),
});

type DistrictFormData = z.infer<typeof DistrictSchema>;
type State = { id: string; name: string };

const CreateDistricts = ({ states }: { states: State[] }) => {
	const [rawInput, setRawInput] = useState("");
	const [districts, setDistricts] = useState<DistrictFormData[]>([]);
	const [stateId, setStateId] = useState<string>(states[0]?.id || "");
	const [loading, setLoading] = useState(false);

	/* ---------------- Parse Input ---------------- */

	const parseInput = () => {
		try {
			let parsed: DistrictFormData[] = [];

			// Try JSON first
			if (rawInput.trim().startsWith("[")) {
				const json = JSON.parse(rawInput);

				if (!Array.isArray(json)) {
					throw new Error("JSON must be an array");
				}

				parsed = json.map((d, index) => ({
					name: d.name,
					code: d.code ?? null,
					priority: d.priority || 1,
					isActive: d.isActive ?? true,
				}));
			} else {
				// Fallback: one district per line
				parsed = rawInput
					.split("\n")
					.map((line, index) => line.trim())
					.filter(Boolean)
					.map((name, index) => ({
						name,
						code: null,
						priority: index,
						isActive: true,
					}));
			}

			// Validate all
			for (const district of parsed) {
				const result = DistrictSchema.safeParse(district);
				if (!result.success) {
					throw new Error(result.error.issues[0].message);
				}
			}

			setDistricts(parsed);
			toast.success(`Parsed ${parsed.length} districts`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Invalid input");
			setDistricts([]);
		}
	};

	/* ---------------- Submit ---------------- */

	const handleSubmit = async () => {
		if (!districts.length) {
			toast.error("No districts to submit");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch(`/api/admin/states/${stateId}/district/bulk`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(districts),
			});

			if (!res.ok) {
				const err = await res.json();
				throw new Error(err?.error || "Failed to create districts");
			}

			toast.success("Districts created successfully");
			setRawInput("");
			setDistricts([]);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	/* ---------------- UI ---------------- */

	return (
		<div className="flex items-center justify-center bg-black/40">
			<div className="w-full max-w-5xl rounded-2xl bg-white p-8 shadow-xl space-y-6">
				{/* State Selector */}
				<select
					className="rounded-lg border px-3 py-2"
					value={stateId}
					onChange={(e) => setStateId(e.target.value)}>
					{states.map((state) => (
						<option key={state.id} value={state.id}>
							{state.name}
						</option>
					))}
				</select>

				{/* Input */}
				<textarea
					value={rawInput}
					onChange={(e) => setRawInput(e.target.value)}
					className="w-full h-40 rounded-lg border px-3 py-2"
					placeholder="Paste JSON array or enter one district per line"
				/>

				{/* Actions */}
				<div className="flex gap-3">
					<button
						onClick={parseInput}
						className="rounded-lg bg-gray-800 px-4 py-2 text-white">
						Preview
					</button>

					<button
						onClick={handleSubmit}
						disabled={loading}
						className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
						{loading ? "Saving..." : "Save Districts"}
					</button>
				</div>

				{/* Preview */}
				{districts.length > 0 && (
					<div className="max-h-48 overflow-auto rounded-lg border p-3 text-sm">
						{districts.map((d, i) => (
							<div key={i} className="flex justify-between py-1">
								<span>{d.name}</span>
								<span className="text-gray-500">priority: {d.priority}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateDistricts;

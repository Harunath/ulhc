"use client";

import { useState } from "react";

export type ULHCFormData = {
	address: string;
	city: string;
	state: string;
	pincode: string;
	healthHistory: string[];
	healthHistoryOtherText?: string;
	medications: string;
	allergies: string;
	tobaccoUse: "Current" | "Former" | "Never" | "";
	alcoholUse: "Regular" | "Occasional" | "None" | "";
	exercise: "Regular" | "Occasional" | "None" | "";
	foodHabits: "Veg" | "Non-Veg" | "";
	insuranceStatus: "NeverApplied" | "ExistingPolicy" | "PastProposalIssue" | "";
	insuranceDetails?: string;
	consent: boolean;
};

export default function HealthDeclarationForm({
	memberInfo,
}: {
	memberInfo: {
		vrkpId: string;
		name: string;
		dob: string;
		mobile: string;
		email: string;
		aadhar: string;
		gender: string;
	};
}) {
	const HEALTH_HISTORY_OPTIONS = [
		"Diabetes / High Blood Sugar",
		"High Blood Pressure / Heart Disease / Stroke",
		"Lung Disease (Asthma / COPD / TB)",
		"Cancer / Tumour",
		"Kidney / Liver Disease",
		"Neurological Disorder (Epilepsy, Parkinson’s, Multiple Sclerosis, etc.)",
		"Mental Health Condition (Depression, Anxiety, Bipolar Disorder, etc.)",
		"Physical Disability (includes blindness, hearing loss, locomotor disability, cerebral palsy, speech/language disability, learning disability, dwarfism, leprosy cured, acid attack survivor, etc.)",
		"Genetic or Hereditary Disorder (Thalassemia, Sickle Cell, Haemophilia, Autism, etc.)",
		"Major Surgery or Hospitalization in last 5 years",
		"Abnormal findings in tests (ECG, MRI, Biopsy, Blood Profile, etc.)",
		"Other long-term condition",
		"None of the above",
	];

	const [form, setForm] = useState<ULHCFormData>({
		address: "",
		city: "",
		state: "",
		pincode: "",
		healthHistory: [],
		healthHistoryOtherText: "",
		medications: "",
		allergies: "",
		tobaccoUse: "",
		alcoholUse: "",
		exercise: "",
		foodHabits: "",
		insuranceStatus: "",
		insuranceDetails: "",
		consent: false,
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitting, setSubmitting] = useState(false);

	const toggleHealthHistory = (option: string) => {
		let updated = [...form.healthHistory];
		if (option === "None of the above") {
			updated = updated.includes(option) ? [] : ["None of the above"];
		} else {
			updated = updated.filter((v) => v !== "None of the above");
			updated.includes(option)
				? (updated = updated.filter((v) => v !== option))
				: updated.push(option);
		}
		setForm({ ...form, healthHistory: updated });
	};

	const validate = () => {
		const errs: Record<string, string> = {};

		if (!form.healthHistory.length)
			errs.healthHistory = "Select at least one health history option";
		if (
			form.healthHistory.includes("Other long-term condition") &&
			!form.healthHistoryOtherText?.trim()
		)
			errs.healthHistoryOtherText = "Please specify other condition";

		if (!form.tobaccoUse) errs.tobaccoUse = "Select tobacco usage";
		if (!form.alcoholUse) errs.alcoholUse = "Select alcohol usage";
		if (!form.exercise) errs.exercise = "Select exercise frequency";
		if (!form.foodHabits) errs.foodHabits = "Select food habit";

		if (!form.insuranceStatus) errs.insuranceStatus = "Select insurance status";
		if (
			form.insuranceStatus === "ExistingPolicy" &&
			!form.insuranceDetails?.trim()
		)
			errs.insuranceDetails = "Please provide insurance details";

		if (!form.consent) errs.consent = "You must agree to proceed";

		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setSubmitting(true);

		try {
			console.log("memberInfo:", memberInfo);
			console.log("Form submitted:", form);
			console.log("gender", memberInfo.gender);
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...memberInfo,
					address: form.address,
					city: form.city,
					state: form.state,
					pincode: form.pincode,
					meta: JSON.stringify({
						healthHistory: form.healthHistory,
						healthHistoryOtherText: form.healthHistoryOtherText,
						medications: form.medications,
						allergies: form.allergies,
						tobaccoUse: form.tobaccoUse,
						alcoholUse: form.alcoholUse,
						exercise: form.exercise,
						foodHabits: form.foodHabits,
						insuranceStatus: form.insuranceStatus,
						insuranceDetails: form.insuranceDetails,
						consent: form.consent,
					}),
				}),
			});
			alert("Form submitted successfully!");
		} catch (err) {
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto my-20 max-w-3xl p-6 space-y-6 bg-white rounded-xl shadow">
			<h1 className="text-2xl font-semibold">
				ULHC {"–"} Member Health Declaration & Consent Form
			</h1>

			{/* Member Info */}
			<section className="space-y-2">
				<h2 className="text-lg font-medium">Member Information</h2>
				{Object.entries(memberInfo).map(([key, value]) => (
					<div key={key}>
						<label className="block text-sm font-medium capitalize">
							{key}
						</label>
						<input
							type="text"
							value={value}
							disabled
							className="mt-1 w-full rounded-lg border px-3 py-2 bg-gray-100"
						/>
					</div>
				))}
			</section>

			<section className="space-y-2">
				<h2 className="text-lg font-medium">Address Details</h2>
				<div className="grid grid-cols-1 gap-2">
					<input
						type="text"
						placeholder="Address"
						value={form.address}
						onChange={(e) => setForm({ ...form, address: e.target.value })}
						className="w-full rounded-lg border px-3 py-2"
					/>
					<input
						type="text"
						placeholder="City"
						value={form.city}
						onChange={(e) => setForm({ ...form, city: e.target.value })}
						className="w-full rounded-lg border px-3 py-2"
					/>
					<input
						type="text"
						placeholder="State"
						value={form.state}
						onChange={(e) => setForm({ ...form, state: e.target.value })}
						className="w-full rounded-lg border px-3 py-2"
					/>
					<input
						type="text"
						placeholder="PIN Code"
						value={form.pincode}
						onChange={(e) => setForm({ ...form, pincode: e.target.value })}
						className="w-full rounded-lg border px-3 py-2"
					/>
				</div>
			</section>

			{/* Health History */}
			<section className="space-y-2">
				<h2 className="text-lg font-medium">
					1) Health History (select all that apply)
				</h2>
				<div className="grid grid-cols-1 gap-2">
					{HEALTH_HISTORY_OPTIONS.map((opt) => (
						<label key={opt} className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={form.healthHistory.includes(opt)}
								onChange={() => toggleHealthHistory(opt)}
							/>
							{opt}
						</label>
					))}
				</div>
				{form.healthHistory.includes("Other long-term condition") && (
					<input
						type="text"
						placeholder="Describe other condition"
						value={form.healthHistoryOtherText}
						onChange={(e) =>
							setForm({ ...form, healthHistoryOtherText: e.target.value })
						}
						className="mt-1 w-full rounded-lg border px-3 py-2"
					/>
				)}
				{errors.healthHistory && (
					<p className="text-sm text-red-600">{errors.healthHistory}</p>
				)}
				{errors.healthHistoryOtherText && (
					<p className="text-sm text-red-600">
						{errors.healthHistoryOtherText}
					</p>
				)}
			</section>

			{/* Medications & Allergies */}
			<section className="space-y-2">
				<h2 className="text-lg font-medium">
					2) Current Medications & Allergies
				</h2>
				<textarea
					placeholder="Current prescribed medications"
					value={form.medications}
					onChange={(e) => setForm({ ...form, medications: e.target.value })}
					className="w-full rounded-lg border px-3 py-2"
				/>
				<textarea
					placeholder="Allergies (drugs/food/other)"
					value={form.allergies}
					onChange={(e) => setForm({ ...form, allergies: e.target.value })}
					className="w-full rounded-lg border px-3 py-2"
				/>
			</section>

			{/* Lifestyle */}
			<section className="space-y-2">
				<h2 className="text-lg font-medium">3) Lifestyle & Habits</h2>

				{/* Tobacco */}
				<div>
					<p className="font-medium">Tobacco Use</p>
					{["Current", "Former", "Never"].map((opt) => (
						<label key={opt} className="mr-4 flex items-center gap-1">
							<input
								type="radio"
								name="tobaccoUse"
								checked={form.tobaccoUse === opt}
								onChange={() =>
									setForm({
										...form,
										tobaccoUse: opt as ULHCFormData["tobaccoUse"],
									})
								}
							/>
							{opt}
						</label>
					))}
					{errors.tobaccoUse && (
						<p className="text-sm text-red-600">{errors.tobaccoUse}</p>
					)}
				</div>

				{/* Alcohol */}
				<div>
					<p className="font-medium">Alcohol Use</p>
					{["Regular", "Occasional", "None"].map((opt) => (
						<label key={opt} className="mr-4 flex items-center gap-1">
							<input
								type="radio"
								name="alcoholUse"
								checked={form.alcoholUse === opt}
								onChange={() =>
									setForm({
										...form,
										alcoholUse: opt as ULHCFormData["alcoholUse"],
									})
								}
							/>
							{opt}
						</label>
					))}
					{errors.alcoholUse && (
						<p className="text-sm text-red-600">{errors.alcoholUse}</p>
					)}
				</div>

				{/* Exercise */}
				<div>
					<p className="font-medium">Exercise</p>
					{["Regular", "Occasional", "None"].map((opt) => (
						<label key={opt} className="mr-4 flex items-center gap-1">
							<input
								type="radio"
								name="exercise"
								checked={form.exercise === opt}
								onChange={() =>
									setForm({
										...form,
										exercise: opt as ULHCFormData["exercise"],
									})
								}
							/>
							{opt}
						</label>
					))}
					{errors.exercise && (
						<p className="text-sm text-red-600">{errors.exercise}</p>
					)}
				</div>

				{/* Food Habits */}
				<div>
					<p className="font-medium">Food Habits</p>
					{["Veg", "Non-Veg"].map((opt) => (
						<label key={opt} className="mr-4 flex items-center gap-1">
							<input
								type="radio"
								name="foodHabits"
								checked={form.foodHabits === opt}
								onChange={() =>
									setForm({
										...form,
										foodHabits: opt as ULHCFormData["foodHabits"],
									})
								}
							/>
							{opt}
						</label>
					))}
					{errors.foodHabits && (
						<p className="text-sm text-red-600">{errors.foodHabits}</p>
					)}
				</div>
			</section>

			{/* Insurance */}
			<section className="space-y-2">
				<h2 className="text-lg font-medium">
					4) Past Insurance / Health Proposals
				</h2>
				<label className="flex items-center gap-2">
					<input
						type="radio"
						name="insuranceStatus"
						checked={form.insuranceStatus === "NeverApplied"}
						onChange={() =>
							setForm({
								...form,
								insuranceStatus: "NeverApplied",
								insuranceDetails: "",
							})
						}
					/>
					I have never applied for health/life insurance before
				</label>
				<label className="flex items-center gap-2">
					<input
						type="radio"
						name="insuranceStatus"
						checked={form.insuranceStatus === "ExistingPolicy"}
						onChange={() =>
							setForm({ ...form, insuranceStatus: "ExistingPolicy" })
						}
					/>
					I have an existing health/life insurance policy (please specify)
				</label>
				{form.insuranceStatus === "ExistingPolicy" && (
					<input
						type="text"
						placeholder="Policy name/insurer, year, exclusions, reasons"
						value={form.insuranceDetails}
						onChange={(e) =>
							setForm({ ...form, insuranceDetails: e.target.value })
						}
						className="w-full rounded-lg border px-3 py-2"
					/>
				)}
				<label className="flex items-center gap-2">
					<input
						type="radio"
						name="insuranceStatus"
						checked={form.insuranceStatus === "PastProposalIssue"}
						onChange={() =>
							setForm({ ...form, insuranceStatus: "PastProposalIssue" })
						}
					/>
					A past insurance proposal was declined / postponed / accepted with
					exclusions
				</label>
				{errors.insuranceStatus && (
					<p className="text-sm text-red-600">{errors.insuranceStatus}</p>
				)}
				{errors.insuranceDetails && (
					<p className="text-sm text-red-600">{errors.insuranceDetails}</p>
				)}
			</section>

			{/* Declaration */}
			<section className="space-y-2">
				<h2 className="text-lg font-medium">5) Declaration & Consent</h2>
				<p className="text-sm">
					I declare that the information I have given is true to the best of my
					knowledge. I understand this will help ULHC provide me with the right
					healthcare support and membership benefits. I allow ULHC to keep my
					health information safe and use it only for my care, in line with
					Indian laws.
				</p>
				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={form.consent}
						onChange={(e) => setForm({ ...form, consent: e.target.checked })}
					/>
					I agree
				</label>
				{errors.consent && (
					<p className="text-sm text-red-600">{errors.consent}</p>
				)}
			</section>

			{/* Actions */}
			<div className="flex gap-4">
				<button
					type="submit"
					disabled={submitting}
					className="rounded-lg bg-black text-white px-5 py-2 disabled:opacity-50">
					{submitting ? "Submitting..." : "Submit"}
				</button>
				<button
					type="button"
					onClick={() =>
						setForm({
							address: "",
							city: "",
							state: "",
							pincode: "",
							healthHistory: [],
							healthHistoryOtherText: "",
							medications: "",
							allergies: "",
							tobaccoUse: "",
							alcoholUse: "",
							exercise: "",
							foodHabits: "",
							insuranceStatus: "",
							insuranceDetails: "",
							consent: false,
						})
					}
					className="rounded-lg border px-5 py-2">
					Reset
				</button>
			</div>
		</form>
	);
}

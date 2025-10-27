"use client";

import { useState } from "react";

export type ULHCFormData = {
	healthHistory: string[];
	healthHistoryOtherText?: string;
	medications: string;
	allergies: string;
	tobaccoUse: "Current" | "Former" | "Never" | "";
	alcoholUse: "Regular" | "Occasional" | "None" | "";
	exercise: "Regular" | "Occasional" | "None" | "";
	foodHabits: "Vegetarian" | "Non-Vegetarian" | "Vegan" | "";
	insuranceStatus: "NeverApplied" | "ExistingPolicy" | "PastProposalIssue" | "";
	insuranceDetails?: string;
	consent: boolean;
};

export default function HealthDeclarationForm() {
	const memberInfo = {
		fullNameAsPerAadhaar: "John Doe",
		dob: "1995-07-16",
		mobile: "9876543210",
		email: "john.doe@example.com",
		aadhar: "123456789012",
	};

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
			console.log("Form submitted:", form);
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
			className="mx-auto my-16 max-w-4xl rounded-2xl bg-slate-50 shadow-2xl p-8 border border-gray-100">
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
				ULHC – Member Health Declaration & Consent Form
			</h1>

			{/* Section Wrapper */}
			<div className="space-y-10">
				{/* Member Info */}
				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
						Member Information
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{Object.entries(memberInfo).map(([key, value]) => (
							<div key={key}>
								<label className="block text-sm font-medium text-gray-700 capitalize">
									{key.replace(/([A-Z])/g, " $1")}
								</label>
								<input
									type="text"
									value={value}
									disabled
									className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600"
								/>
							</div>
						))}
					</div>
				</section>

				{/* Insurance Section */}
				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
						1️⃣ Past Insurance / Health Proposals
					</h2>

					<div className="space-y-3 text-gray-700">
						{/* Radio 1 */}
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
								className="mt-0.5 accent-blue-600"
							/>
							<span>I have never applied for health/life insurance before</span>
						</label>

						{/* Radio 2 */}
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="insuranceStatus"
								checked={form.insuranceStatus === "ExistingPolicy"}
								onChange={() =>
									setForm({ ...form, insuranceStatus: "ExistingPolicy" })
								}
								className="mt-0.5 accent-blue-600"
							/>
							<span>
								I have an existing health/life insurance policy (please specify)
							</span>
						</label>

						{form.insuranceStatus === "ExistingPolicy" && (
							<input
								type="text"
								placeholder="Policy name, insurer, year, exclusions, reasons"
								value={form.insuranceDetails}
								onChange={(e) =>
									setForm({ ...form, insuranceDetails: e.target.value })
								}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
							/>
						)}

						{/* Radio 3 */}
						<label className="flex items-center gap-2">
							<input
								type="radio"
								name="insuranceStatus"
								checked={form.insuranceStatus === "PastProposalIssue"}
								onChange={() =>
									setForm({ ...form, insuranceStatus: "PastProposalIssue" })
								}
								className="mt-0.5 accent-blue-600"
							/>
							<span>
								A past insurance proposal was declined / postponed / accepted
								with exclusions
							</span>
						</label>

						{errors.insuranceStatus && (
							<p className="text-sm text-red-600">{errors.insuranceStatus}</p>
						)}
						{errors.insuranceDetails && (
							<p className="text-sm text-red-600">{errors.insuranceDetails}</p>
						)}
					</div>
				</section>

				{/* Health History */}
				<section className="space-y-4">
					<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
						2️⃣ Health History
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
						{HEALTH_HISTORY_OPTIONS.map((opt) => (
							<label key={opt} className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={form.healthHistory.includes(opt)}
									onChange={() => toggleHealthHistory(opt)}
									className="mt-0.5 accent-blue-600"
								/>
								<span>{opt}</span>
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
							className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
						3️⃣ Current Medications & Allergies
					</h2>
					<textarea
						placeholder="Current prescribed medications"
						value={form.medications}
						onChange={(e) => setForm({ ...form, medications: e.target.value })}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
					<textarea
						placeholder="Allergies (drugs/food/other)"
						value={form.allergies}
						onChange={(e) => setForm({ ...form, allergies: e.target.value })}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</section>

				{/* Lifestyle */}
				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
						4️⃣ Lifestyle & Habits
					</h2>

					{[
						{
							label: "Tobacco Use",
							name: "tobaccoUse",
							options: ["Current", "Former", "Never"],
						},
						{
							label: "Alcohol Use",
							name: "alcoholUse",
							options: ["Regular", "Occasional", "None"],
						},
						{
							label: "Exercise",
							name: "exercise",
							options: ["Regular", "Occasional", "None"],
						},
						{
							label: "Food Habits",
							name: "foodHabits",
							options: ["Vegetarian", "Non-Vegetarian", "Vegan"],
						},
					].map((group) => (
						<div key={group.name}>
							<p className="font-semibold text-gray-800">{group.label}</p>
							<div className="flex flex-wrap gap-4 mt-1">
								{group.options.map((opt) => (
									<label key={opt} className="flex items-center gap-1">
										<input
											type="radio"
											name={group.name}
											checked={form[group.name as keyof ULHCFormData] === opt}
											onChange={() =>
												setForm({
													...form,
													[group.name]: opt,
												})
											}
										/>
										{opt}
									</label>
								))}
							</div>
							{errors[group.name] && (
								<p className="text-sm text-red-600">{errors[group.name]}</p>
							)}
						</div>
					))}
				</section>

				{/* Declaration */}
				<section className="space-y-3">
					<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
						5️⃣ Declaration & Consent
					</h2>
					<p className="text-gray-700 text-sm leading-relaxed">
						I declare that the information I have given is true to the best of
						my knowledge. I understand this will help ULHC provide me with the
						right healthcare support and membership benefits. I allow ULHC to
						keep my health information safe and use it only for my care, in line
						with Indian laws.
					</p>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={form.consent}
							onChange={(e) => setForm({ ...form, consent: e.target.checked })}
						/>
						<span>I agree</span>
					</label>
					{errors.consent && (
						<p className="text-sm text-red-600">{errors.consent}</p>
					)}
				</section>

				{/* Actions */}
				<div className="flex justify-center gap-4 pt-6">
					<button
						type="submit"
						disabled={submitting}
						className="rounded-lg bg-[#045e5a] text-white px-6 py-2 font-medium  transition disabled:opacity-50">
						{submitting ? "Submitting..." : "Submit"}
					</button>
					<button
						type="button"
						onClick={() =>
							setForm({
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
						className="rounded-lg border border-gray-400 px-6 py-2 text-gray-700 hover:bg-gray-100 transition">
						Reset
					</button>
				</div>
			</div>
		</form>
	);
}

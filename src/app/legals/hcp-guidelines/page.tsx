import React from "react";

export default function HCPGuidelines() {
	return (
		<div className="max-w-4xl mt-20 mx-auto px-6 py-12 text-gray-800 leading-relaxed">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Healthcare Professional (HCP) Guidelines
			</h1>
			<p className="mb-4">
				<strong>Effective Date:</strong> 18th September, 2025
			</p>
			<p className="mb-6">
				These Healthcare Professional (HCP) Guidelines (“Guidelines”) outline
				the professional, ethical, and compliance standards expected from all
				doctors, hospitals, and healthcare providers (“you,” “HCPs”) who
				collaborate with Unity Life Health Care (ULHC). By partnering with ULHC,
				you agree to adhere to these Guidelines to ensure safe, transparent, and
				high-quality healthcare for our members.
			</p>

			<Section title="1. Professional Standards">
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Provide care in accordance with recognized medical and ethical
						standards.
					</li>
					<li>
						Maintain appropriate licenses, registrations, and accreditations at
						all times.
					</li>
					<li>
						Uphold patient confidentiality in compliance with applicable laws.
					</li>
				</ul>
			</Section>

			<Section title="2. Patient Care & Safety">
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Prioritize patient health, safety, and dignity in all services
						provided.
					</li>
					<li>
						Ensure accurate and transparent communication regarding diagnoses,
						treatment options, and costs.
					</li>
					<li>
						Provide emergency support in accordance with local medical
						regulations.
					</li>
				</ul>
			</Section>

			<Section title="3. Compliance & Lawful Conduct">
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Comply with all applicable healthcare laws, regulations, and ULHC
						policies.
					</li>
					<li>
						Prohibit fraudulent claims, misrepresentation of services, or
						malpractice.
					</li>
					<li>
						Report adverse events or violations promptly to ULHC for review and
						corrective action.
					</li>
				</ul>
			</Section>

			<Section title="4. Transparency & Ethical Practices">
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Disclose all treatment-related costs clearly to patients and ULHC.
					</li>
					<li>
						Avoid conflicts of interest, including referral kickbacks or
						improper financial incentives.
					</li>
					<li>
						Ensure ethical use of ULHC branding, services, and referral
						channels.
					</li>
				</ul>
			</Section>

			<Section title="5. Data Protection & Confidentiality">
				<p>
					HCPs must safeguard patient data in compliance with the{" "}
					<a href="/privacy-policy" className="text-blue-600 underline">
						Privacy Policy
					</a>
					. Unauthorized disclosure of patient records, medical history, or ULHC
					proprietary information is strictly prohibited.
				</p>
			</Section>

			<Section title="6. Quality Assurance & Monitoring">
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Allow ULHC to conduct audits, reviews, or assessments of services
						when required.
					</li>
					<li>
						Participate in training, quality improvement, and feedback programs
						initiated by ULHC.
					</li>
					<li>
						Strive for continuous improvement in patient outcomes and
						satisfaction.
					</li>
				</ul>
			</Section>

			<Section title="7. Termination of Collaboration">
				<p>
					ULHC reserves the right to suspend or terminate collaboration with any
					HCP who violates these Guidelines, applicable laws, or patient safety
					standards.
				</p>
			</Section>

			<Section title="8. Governing Law & Disputes">
				<p>
					These Guidelines are governed by the laws of India. Any disputes will
					be resolved under the exclusive jurisdiction of courts in Hyderabad,
					Telangana.
				</p>
			</Section>

			<Section title="9. Contact Us">
				<p>
					For questions regarding these Guidelines, please contact us at:{" "}
					<a
						href="mailto:contact@unitylifehealthcare.com"
						className="text-blue-600 underline">
						contact@unitylifehealthcare.com
					</a>
				</p>
			</Section>
		</div>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mb-8">
			<h2 className="text-xl font-semibold mb-3">{title}</h2>
			<div className="space-y-2">{children}</div>
		</div>
	);
}

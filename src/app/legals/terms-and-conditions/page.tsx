export default function TermsAndConditions() {
	return (
		<div className="mx-auto max-w-4xl px-6 py-12 mt-20 text-gray-800">
			<h1 className="text-3xl font-bold text-[#045e5a] mb-6">
				Terms & Conditions
			</h1>
			<p className="text-sm text-gray-500 mb-8">
				Effective Date: 18th September, 2025
			</p>

			<p className="mb-6">
				Welcome to Unity Life Health Care (“we,” “us,” or “our”). By accessing
				or using the website at{" "}
				<a
					href="https://www.unitylifehealthcare.com/"
					className="text-[#045e5a] underline"
					target="_blank"
					rel="noopener noreferrer">
					https://www.unitylifehealthcare.com/
				</a>{" "}
				(the “Site”) and any related services (collectively, the “Service”), you
				agree to these Terms & Conditions (“Terms”). Please read them carefully.
			</p>

			{[
				{
					title: "1. Acceptance of Terms",
					content: `By accessing, browsing, or using this Site, you affirm that you are at least 10 years old and have the legal capacity to form binding contracts. If you do not agree with any part of these Terms, please do not use the Site or Services.`,
				},
				{
					title: "2. Services Overview",
					content: `Unity Life Health Care (ULHC) is a Healthcare Enabler that collaborates with select hospitals to provide members within our trusted communities with affordable, high-quality healthcare.`,
				},
				{
					title: "3. User Responsibilities",
					content: (
						<ul className="list-disc list-inside space-y-1">
							<li>
								<strong>Accuracy of Information:</strong> You agree to provide
								accurate, current, and complete information when using the
								Service.
							</li>
							<li>
								<strong>Lawful Use:</strong> You must not use this Site for
								illegal or unauthorized purposes.
							</li>
							<li>
								<strong>Account Security:</strong> You are responsible for
								safeguarding any login credentials and for any activity that
								occurs under your account.
							</li>
						</ul>
					),
				},
				{
					title: "4. Intellectual Property",
					content: `All content on this Site—including text, graphics, logos, images, videos, audio, and software—is owned by or licensed to Unity Life Health Care and is protected by intellectual property laws. Use of our content is permitted only in connection with using the Service, unless otherwise expressly authorized.`,
				},
				{
					title: "5. Third-Party Links",
					content: `Our Service may contain links to third-party websites or services. We are not responsible for their content, privacy policies, or practices. Your interaction with such sites is at your own risk.`,
				},
				{
					title: "6. Disclaimer of Warranties",
					content: `The Service is provided “as is” and “as available.” We make no warranties, express or implied, regarding the Service’s accuracy, reliability, or suitability for any purpose. Your use of the Service is at your own risk.`,
				},
				{
					title: "7. Limitation of Liability",
					content: `To the fullest extent permitted by law, Unity Life Health Care (ULHC) (and its affiliates, officers, employees, and agents) will not be liable for any indirect, incidental, special, or consequential damages resulting from your use of—or inability to use—the Service.`,
				},
				{
					title: "8. Indemnification",
					content: (
						<ul className="list-disc list-inside space-y-1">
							<li>Your use of the Service;</li>
							<li>Violation of these Terms; or</li>
							<li>Infringement of any third-party rights.</li>
						</ul>
					),
				},
				{
					title: "9. Modifications to the Terms",
					content: `We may update these Terms from time to time. When we do, we'll revise the "Effective Date" at the top. Continued use of the Service after changes constitutes your acceptance of the updated Terms. We recommend you review this page periodically.`,
				},
				{
					title: "10. Termination",
					content: `We may suspend or terminate your access to the Service at any time, with or without cause, including for breaches of these Terms or any applicable laws. Upon termination, any provisions that should survive (e.g., intellectual property, limitation of liability, indemnification) will remain in effect.`,
				},
				{
					title: "11. Governing Law & Dispute Resolution",
					content: `These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Hyderabad, Telangana. You consent to exclusive jurisdiction and venue in those courts.`,
				},
				{
					title: "12. Severability",
					content: `If any part of these Terms is held invalid or unenforceable, the remainder will continue in full force and effect.`,
				},
				{
					title: "13. Entire Agreement",
					content: `These Terms, together with the Privacy Policy and any other legal notices (e.g., disclaimers, user agreements), constitute the entire agreement between you and Unity Life Health Care (ULHC) regarding your use of the Service.`,
				},
				{
					title: "14. Contact Us",
					content: (
						<p>
							If you have questions or concerns about these Terms, please
							contact us at{" "}
							<a
								href="mailto:contact@unitylifehealthcare.com"
								className="text-[#045e5a] underline">
								contact@unitylifehealthcare.com
							</a>
							, or visit:{" "}
							<a
								href="https://www.unitylifehealthcare.com/"
								className="text-[#045e5a] underline"
								target="_blank"
								rel="noopener noreferrer">
								https://www.unitylifehealthcare.com/
							</a>
						</p>
					),
				},
			].map((section, idx) => (
				<div key={idx} className="mb-6">
					<h2 className="text-lg font-semibold mb-2">{section.title}</h2>
					<div className="text-sm leading-relaxed">{section.content}</div>
				</div>
			))}
		</div>
	);
}

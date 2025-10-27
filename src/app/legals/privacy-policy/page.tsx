import React from "react";

export default function PrivacyPolicy() {
	return (
		<div className="max-w-4xl mt-20 mx-auto px-6 py-12 text-gray-800 leading-relaxed">
			<h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
			<p className="mb-4">
				<strong>Effective Date:</strong> 18th September, 2025
			</p>
			<p className="mb-6">
				Unity Life Health Care (ULHC) (&quot;us&quot;, &quot;we&quot;, or
				&quot;our&quot;) operates the{" "}
				<a
					href="https://www.unitylifehealthcare.com/"
					className="text-blue-600 underline">
					https://www.unitylifehealthcare.com/
				</a>{" "}
				website (the &quot;Service&quot;).
			</p>
			<p className="mb-6">
				This page informs you of our policies regarding the collection, use, and
				disclosure of personal data when you use our Service and the choices you
				have associated with that data.
			</p>
			<p className="mb-6">
				We use your data to provide and improve the Service. By using the
				Service, you agree to the collection and use of information in
				accordance with this policy. Unless otherwise defined in this Privacy
				Policy, terms used in this Privacy Policy have the same meanings as in
				our Terms and Conditions.
			</p>

			{/* Sections */}
			<Section title="Information Collection and Use">
				<p>
					We collect several different types of information for various purposes
					to provide and improve our Service to you.
				</p>
			</Section>

			<Section title="Types of Data Collected">
				<h3 className="text-lg font-semibold mt-4 mb-2">Personal Data</h3>
				<p className="mb-2">
					While using our Service, we may ask you to provide certain personally
					identifiable information, including:
				</p>
				<ul className="list-disc pl-6 space-y-1">
					<li>Email address</li>
					<li>First name and last name</li>
					<li>Phone number</li>
					<li>Address, State, Province, ZIP/Postal code, City</li>
					<li>Cookies and Usage Data</li>
				</ul>

				<h3 className="text-lg font-semibold mt-6 mb-2">Usage Data</h3>
				<p>
					We may also collect information such as your IP address, browser type,
					pages visited, time spent, and other diagnostic data.
				</p>

				<h3 className="text-lg font-semibold mt-6 mb-2">
					Tracking & Cookies Data
				</h3>
				<p className="mb-2">
					We use cookies and similar tracking technologies. Examples include:
				</p>
				<ul className="list-disc pl-6 space-y-1">
					<li>Session Cookies – to operate our Service</li>
					<li>Preference Cookies – to remember your settings</li>
					<li>Security Cookies – for security purposes</li>
				</ul>
			</Section>

			<Section title="Use of Data">
				<ul className="list-disc pl-6 space-y-1">
					<li>To provide and maintain the Service</li>
					<li>To notify you about changes</li>
					<li>To allow participation in interactive features</li>
					<li>To provide customer support</li>
					<li>To monitor usage and improve the Service</li>
					<li>To detect, prevent, and address technical issues</li>
				</ul>
			</Section>

			<Section title="Transfer of Data">
				<p>
					Your data may be transferred to — and maintained on — computers
					outside your state, province, or country. By submitting data, you
					consent to this transfer. ULHC ensures adequate safeguards are in
					place.
				</p>
			</Section>

			<Section title="Disclosure of Data">
				<p>We may disclose Personal Data when necessary to:</p>
				<ul className="list-disc pl-6 space-y-1">
					<li>Comply with legal obligations</li>
					<li>Protect rights or property of ULHC</li>
					<li>Prevent wrongdoing</li>
					<li>Ensure public or user safety</li>
					<li>Defend against legal liability</li>
				</ul>
			</Section>

			<Section title="Security of Data">
				<p>
					While we use commercially acceptable means to protect Personal Data,
					no method of transmission or storage is 100% secure.
				</p>
			</Section>

			<Section title="Service Providers">
				<p>
					We may employ third parties to provide, analyze, or support our
					Service. They are obligated not to disclose or misuse your Personal
					Data.
				</p>
			</Section>

			<Section title="Analytics">
				<p>
					We use tools like Google Analytics to monitor Service usage. For more
					information, visit{" "}
					<a
						href="https://policies.google.com/privacy"
						className="text-blue-600 underline">
						Google Privacy & Terms
					</a>
					.
				</p>
			</Section>

			<Section title="Links to Other Sites">
				<p>
					Our Service may contain links to other websites. We are not
					responsible for their content, privacy policies, or practices.
				</p>
			</Section>

			<Section title="Children's Privacy">
				<p>
					Our Service does not address anyone under the age of 18. We do not
					knowingly collect data from children. If you believe your child has
					shared data, please contact us.
				</p>
			</Section>

			<Section title="Changes to This Privacy Policy">
				<p>
					We may update this Privacy Policy from time to time. Changes will be
					posted here with an updated effective date. You are advised to review
					periodically.
				</p>
			</Section>

			<Section title="Contact Us">
				<p>
					If you have any questions, please contact us at:{" "}
					<a
						href="mailto:help@unitylifehealthcare.com"
						className="text-blue-600 underline">
						help@unitylifehealthcare.com
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

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiGlobe, FiUser, FiPhone } from "react-icons/fi";

const BRAND = "#045e5a";

export default function ContactSection() {
	return (
		<section className="relative overflow-hidden mt-10">
			{/* Background accents */}
			<div
				className="pointer-events-none absolute inset-0 opacity-20"
				style={{
					background:
						"radial-gradient(600px 300px at 10% 10%, rgba(4,94,90,0.08), transparent 60%), radial-gradient(500px 240px at 90% 20%, rgba(4,94,90,0.08), transparent 60%)",
				}}
			/>
			<div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					className="text-center max-w-3xl mx-auto">
					<div
						className="mx-auto mb-6 h-1 w-24 rounded-full"
						style={{ backgroundColor: BRAND }}
					/>
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Reach Out to <span style={{ color: BRAND }}>ULHC</span>
					</h1>
					<p className="mt-4 text-lg leading-7 text-gray-600">
						We&apos;re here to support you! Whether you are a member seeking
						care or a hospital interested in partnering, our team is ready to
						assist you.
					</p>
				</motion.div>

				{/* Split card */}
				<div className="mt-12 grid gap-8 lg:grid-cols-2">
					{/* Left - Details (brand gradient panel) */}
					<motion.div
						initial={{ opacity: 0, x: -12 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.45, delay: 0.05 }}
						className="relative rounded-2xl overflow-hidden shadow-xl">
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(135deg, rgba(4,94,90,1) 0%, rgba(4,94,90,0.85) 30%, rgba(4,94,90,0.75) 100%)",
							}}
						/>
						{/* subtle pattern */}
						<div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(white,transparent_70%)] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:18px_18px]" />
						<div className="relative p-8 md:p-10 text-white">
							<h3 className="text-xl font-semibold">Contact Details</h3>
							<p className="mt-2 text-white/80 text-sm">
								Connect with our team—quick responses during working hours.
							</p>

							<div className="mt-8 space-y-4">
								<DetailRow
									icon={<FiMail className="h-5 w-5" />}
									title="Email"
									value="info@unitylifehealthcare.com"
								/>
								<DetailRow
									icon={<FiGlobe className="h-5 w-5" />}
									title="Website"
									value="unitylifehealthcare.com"
									link="https://www.unitylifehealthcare.com/"
								/>
								<DetailRow
									icon={<FiMapPin className="h-5 w-5" />}
									title="Address"
									value="Hyderabad, Telangana"
								/>
							</div>

							{/* CTA note */}
							<div className="mt-8 rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15">
								<p className="text-sm text-white/90">
									Prefer email? We usually respond within{" "}
									<span className="font-semibold">24 hours</span>.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Right - Form (glass card) */}
					<motion.div
						initial={{ opacity: 0, x: 12 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.45, delay: 0.1 }}
						className="rounded-2xl bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-slate-200 shadow-xl">
						<ContactForm />
					</motion.div>
				</div>
			</div>
		</section>
	);
}

/* ---------- Left: Detail row ---------- */
function DetailRow({
	icon,
	title,
	value,
	link,
}: {
	icon: React.ReactNode;
	title: string;
	value: string;
	link?: string;
}) {
	return (
		<div className="flex items-start gap-3 rounded-xl p-3 hover:bg-white/10 transition">
			<div className="shrink-0 rounded-full bg-white/15 p-2">{icon}</div>
			<div>
				<p className="text-sm uppercase tracking-wide text-white/70">{title}</p>
				{link ? (
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-base font-medium hover:underline">
						{value}
					</a>
				) : (
					<p className="text-base font-medium">{value}</p>
				)}
			</div>
		</div>
	);
}

/* ---------- Right: Contact Form ---------- */
function ContactForm() {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSent(true);
			setTimeout(() => setSent(false), 3000);
		}, 1200);
	}

	return (
		<form onSubmit={handleSubmit} className="p-6 md:p-8">
			<h2 className="text-xl font-bold text-gray-900">Send us a Message</h2>
			<p className="mt-1 text-sm text-gray-600">
				Fill the form and we&apos;ll get back to you shortly.
			</p>

			<div className="mt-6 grid gap-4">
				<InputWithIcon
					icon={<FiUser />}
					placeholder="Full Name"
					type="text"
					required
				/>
				<InputWithIcon
					icon={<FiMail />}
					placeholder="Email Address"
					type="email"
					required
				/>
				<InputWithIcon
					icon={<FiPhone />}
					placeholder="Phone Number"
					type="tel"
					required
				/>
				<TextareaFancy placeholder="Your Message" required rows={4} />
			</div>

			<div className="mt-6 flex items-center gap-3">
				<button
					type="submit"
					disabled={loading}
					className="group relative inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition focus:outline-none sm:w-auto"
					style={{ background: `linear-gradient(135deg, ${BRAND}, #0b8f8a)` }}>
					<span className="absolute inset-0 rounded-lg ring-1 ring-black/5 group-hover:ring-black/10" />
					{loading ? "Sending…" : "Send Message"}
				</button>

				{sent && (
					<motion.span
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="text-sm font-medium text-emerald-700">
						Message sent ✓
					</motion.span>
				)}
			</div>
		</form>
	);
}

/* ---------- Inputs ---------- */
function InputWithIcon({
	icon,
	placeholder,
	type = "text",
	required,
}: {
	icon: React.ReactNode;
	placeholder: string;
	type?: string;
	required?: boolean;
}) {
	return (
		<label className="group relative block">
			<span className="sr-only">{placeholder}</span>
			<div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
				{icon}
			</div>
			<input
				type={type}
				required={required}
				placeholder={placeholder}
				className="w-full rounded-lg border border-slate-300 bg-white/80 pl-10 pr-3 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-[#045e5a] focus:ring-2 focus:ring-[#045e5a]/25"
			/>
			{/* subtle bottom accent on focus */}
			<span
				className="pointer-events-none absolute bottom-0 left-2 right-2 h-[2px] scale-x-0 rounded-full transition-transform group-focus-within:scale-x-100"
				style={{ backgroundColor: BRAND }}
			/>
		</label>
	);
}

function TextareaFancy({
	placeholder,
	required,
	rows = 4,
}: {
	placeholder: string;
	required?: boolean;
	rows?: number;
}) {
	return (
		<label className="group relative block">
			<span className="sr-only">{placeholder}</span>
			<textarea
				required={required}
				rows={rows}
				placeholder={placeholder}
				className="w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2.5 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-[#045e5a] focus:ring-2 focus:ring-[#045e5a]/25"
			/>
			<span
				className="pointer-events-none absolute bottom-0 left-2 right-2 h-[2px] scale-x-0 rounded-full transition-transform group-focus-within:scale-x-100"
				style={{ backgroundColor: BRAND }}
			/>
		</label>
	);
}

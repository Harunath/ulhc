"use client";

import { motion } from "framer-motion";

const BRAND = "#045e5a";

export default function Vision() {
	return (
		<section
			className="relative overflow-hidden py-20 sm:py-28"
			style={{
				background: `linear-gradient(135deg, ${BRAND}, #034240)`,
			}}
		>
			<div className="mx-auto max-w-5xl px-4 text-center">
				{/* Card container */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="relative mx-auto rounded-3xl bg-white/10 px-6 py-12 shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:px-10 lg:px-16"
				>
					{/* Label */}
					<span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-sm ring-1 ring-white/30">
						Our Vision
					</span>

					{/* Title */}
					<h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
						A healthier, stronger community
					</h2>

					{/* Decorative underline */}
					<div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white/70" />

					{/* Description */}
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
						Where no one is denied medical care due to{" "}
						<span className="font-semibold">cost or distance</span>.
					</p>
				</motion.div>
			</div>

			{/* Background accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl"
			/>
		</section>
	);
}

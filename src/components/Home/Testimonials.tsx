"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Testimonial = {
	quote: string;
	name: string;
	meta?: string;
	avatarUrl?: string;
};

type Props = {
	title?: string;
	subtitle?: string;
	items?: Testimonial[];
};

export default function Testimonials({
	title = "Community Impact & Testimonials",
	subtitle = "Real stories from ULHC members—simple, affordable, trusted.",
	items,
}: Props) {
	const data = useMemo<Testimonial[]>(
		() =>
			items ?? [
				{
					quote: "ULHC helped me save on my mother’s surgery.",
					name: "Rajesh",
					meta: "Hyderabad",
				},
				{
					quote: "The free second opinion gave me confidence.",
					name: "Meena",
					meta: "Bengaluru",
				},
				{
					quote: "Affordable, simple, and trustworthy service.",
					name: "Suresh",
					meta: "Chennai",
				},
			],
		[items]
	);

	return (
		<section className="relative py-16 sm:py-20 bg-neutral-50-100">
			{/* soft glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-30"
				style={{
					background:
						"radial-gradient(600px 200px at 50% 0%, rgba(59,130,246,.15), transparent 70%)",
				}}
			/>
			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="text-center mb-10 sm:mb-14">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
						{title}
					</h2>
					{subtitle ? (
						<p className="mt-3 text-black  max-w-2xl mx-auto">{subtitle}</p>
					) : null}
				</motion.div>

				{/* Mobile: horizontal snap carousel; Desktop: grid */}
				<div className="md:hidden">
					<ul
						className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6"
						aria-label="Member testimonials">
						{data.map((t, i) => (
							<li
								key={i}
								className="snap-center shrink-0 basis-[85%] bg-neutral-50 dark:bg-neutral-800 border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-sm">
								<QuoteCard t={t} />
							</li>
						))}
					</ul>
				</div>

				<div className="hidden md:grid md:grid-cols-3 gap-6">
					{data.map((t, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 14 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							className="bg-neutral-50 dark:bg-neutral-800 border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-sm">
							<QuoteCard t={t} />
						</motion.div>
					))}
				</div>

				{/* Trust cue */}
				<div className="mt-10 text-center">
					<p className="text-sm text-gray-500 dark:text-gray-400">
						👉 Purpose: build trust with social proof
					</p>
				</div>
			</div>
		</section>
	);
}

function QuoteCard({ t }: { t: Testimonial }) {
	return (
		<figure className="flex flex-col gap-4">
			<blockquote className="text-gray-700 dark:text-gray-200 leading-relaxed">
				<span aria-hidden className="mr-1 text-xl leading-none">
					“
				</span>
				<span className="italic">{t.quote}</span>
				<span aria-hidden className="ml-1 text-xl leading-none">
					”
				</span>
			</blockquote>

			<figcaption className="flex items-center gap-3">
				{t.avatarUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={t.avatarUrl}
						alt={`${t.name} avatar`}
						className="h-9 w-9 rounded-full object-cover border border-black/10 dark:border-white/10"
					/>
				) : (
					<div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#045e5a]/70 to-[#045e5a]/50 dark:from-[#045e5a]/30 dark:to-[#045e5a]/10 border border-black/10 dark:border-white/10" />
				)}
				<div className="text-sm">
					<div className="font-semibold text-gray-900 dark:text-white">
						{t.name}
					</div>
					{t.meta ? (
						<div className="text-gray-500 dark:text-gray-400">{t.meta}</div>
					) : null}
				</div>
			</figcaption>
		</figure>
	);
}

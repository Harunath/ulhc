"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Cta() {
	return (
		<section className="relative overflow-hidden">
			{/* background */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						"radial-gradient(1200px 400px at 10% 20%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(1200px 500px at 90% 80%, rgba(59,130,246,0.12), transparent 60%)",
				}}
			/>

			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					{/* subtle corner gradient */}
					<div
						aria-hidden
						className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
						style={{
							background:
								"radial-gradient(closest-side, rgba(59,130,246,0.18), transparent)",
						}}
					/>

					<div className="flex flex-col items-start gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
						<div>
							<h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
								With ULHC, you’re not just a cardholder — you’re part of a
								healthcare movement.
							</h3>
							<p className="mt-2 max-w-2xl text-slate-600">
								Save on medical expenses, access trusted care when it matters
								most, and help strengthen community well-being.
							</p>
						</div>

						<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
							<Link
								href="/join"
								className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
								Join ULHC Today
							</Link>
							<Link
								href="/hcp"
								className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50">
								Learn About the Health Card
							</Link>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

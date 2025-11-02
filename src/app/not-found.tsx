"use client";

import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";

export default function UnderDevelopment() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 text-center">
			{/* Icon */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="mb-6 rounded-full bg-[#0077B6]/10 p-6">
				<FiTool className="h-12 w-12 text-[#0077B6]" />
			</motion.div>

			{/* Heading */}
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="text-3xl font-bold text-[#0077B6] md:text-5xl">
				Page Under Development
			</motion.h1>

			{/* Description */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="mt-4 max-w-lg text-gray-600">
				This page is currently under construction. We&apos;re working hard to
				bring it to you soon. Stay tuned!
			</motion.p>

			{/* CTA Button */}
			<motion.a
				href="/"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="mt-8 inline-block rounded-lg bg-[#0077B6] px-6 py-3 text-white shadow-md transition">
				Back to Home
			</motion.a>
		</div>
	);
}

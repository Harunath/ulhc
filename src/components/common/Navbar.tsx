"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const ACCENT = "text-[#045e5a]";
const ACCENT_BG = "bg-[#045e5a]";

const LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/empanelment", label: "Empanelment" },
	{ href: "/network-hospitals", label: "Network Hospitals" },
	{ href: "/hcp", label: "Health Care Program" },
	{ href: "/contact", label: "Contact" },
];

export default function Navbar() {
	const pathname = usePathname();
	const [hovered, setHovered] = useState<string | null>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// close mobile drawer on route change
	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	return (
		<nav
			className={[
				"fixed top-0 left-0 z-50 w-full h-20 flex items-center transition-all duration-300",
				scrolled && !menuOpen
					? "bg-white/85 backdrop-blur-lg shadow-md"
					: "bg-transparent",
			].join(" ")}
			aria-label="Main navigation">
			<div className="mx-auto font-medium flex w-full max-w-7xl items-center justify-between px-4 lg:px-8">
				{/* Logo (ULHC text) */}
				<Link
					href="/"
					className="group inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#045e5a]">
					{/* <span className={`text-2xl font-extrabold tracking-wide ${ACCENT}`}>
						ULHC
					</span>
					<span className="hidden text-xs font-medium text-slate-500 sm:inline">
						Unity Life Health Care
					</span> */}
					<Image
						src="https://res.cloudinary.com/diaoy3wzi/image/upload/v1757327269/ULHC_Logo_PNG_sxooqj.png"
						alt="ULHC Logo"
						width={150}
						height={50}
					/>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden items-center gap-x-6 font-medium lg:flex">
					{LINKS.map((link) => {
						const active = pathname === link.href;
						return (
							<motion.div
								key={link.href}
								onMouseEnter={() => setHovered(link.href)}
								onMouseLeave={() => setHovered(null)}
								whileHover={{ color: "#045e5a" }} // [#045e5a]
								className="relative px-2 py-1 min-w-16 flex justify-center items-center">
								<Link
									href={link.href}
									className={[
										"transition duration-300",
										active ? ACCENT : "text-black hover:text-[#045e5a]",
									].join(" ")}>
									{link.label}
								</Link>

								{/* Animated underline */}
								<AnimatePresence>
									{(hovered === link.href || active) && (
										<motion.div
											layoutId="desktop-underline"
											className={`absolute bottom-0 left-0 h-[2px] w-full ${ACCENT_BG}`}
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 30,
											}}
										/>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
					{/* <Link
						href="/join"
						className="rounded-lg bg-[#045e5a] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#045e5a]">
						Join Us
					</Link> */}
				</div>

				{/* Mobile Menu Toggle */}
				<button
					onClick={() => setMenuOpen(true)}
					className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#045e5a]"
					aria-label="Open menu"
					aria-expanded={menuOpen}
					aria-controls="mobile-drawer">
					<FaBars size={22} />
				</button>
			</div>

			{/* Mobile Drawer */}
			<AnimatePresence>
				{menuOpen && (
					<>
						{/* Backdrop */}
						<motion.button
							type="button"
							className="fixed inset-0 z-[49] bg-black/40 lg:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setMenuOpen(false)}
							aria-label="Close menu backdrop"
						/>

						{/* Panel */}
						<motion.aside
							id="mobile-drawer"
							className="fixed top-0 right-0 z-[50] h-full w-4/5 max-w-xs font-medium bg-white px-6 pt-24 pb-8 shadow-xl lg:hidden"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							aria-modal="true"
							role="dialog">
							{/* Close Button */}
							<button
								onClick={() => setMenuOpen(false)}
								className="absolute top-6 right-6 text-[#045e5a] hover:rotate-90 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#045e5a] rounded-md"
								aria-label="Close menu">
								<FaTimes size={26} />
							</button>

							{/* Links */}
							<nav className="flex flex-col gap-3">
								{LINKS.map((link) => {
									const active = pathname === link.href;
									return (
										<motion.div
											key={link.href}
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}>
											<Link
												href={link.href}
												onClick={() => setMenuOpen(false)}
												className={[
													"block rounded-md px-3 py-2 text-base font-medium transition-colors duration-300",
													active
														? "bg-[#045e5a]/10 text-[#045e5a]"
														: "text-slate-800 hover:bg-slate-100",
												].join(" ")}>
												{link.label}
											</Link>
										</motion.div>
									);
								})}

								{/* <div className="pt-2">
									<Link
										href="/join"
										onClick={() => setMenuOpen(false)}
										className="block rounded-lg bg-[#045e5a] px-3 py-2 text-center text-sm font-semibold text-white shadow hover:bg-blue-700">
										Join Us
									</Link>
								</div> */}
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</nav>
	);
}

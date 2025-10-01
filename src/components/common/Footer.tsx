"use client";

import Link from "next/link";

import Image from "next/image";

export default function Footer() {
	return (
		<footer className="relative bg-[#045e5a] text-white">
			{/* Top */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Logo + Mission */}
					<div>
						<Image
							src="https://res.cloudinary.com/diaoy3wzi/image/upload/v1757327269/ULHC_Logo_PNG_sxooqj.png"
							alt="ULHC Logo"
							width={150}
							height={50}
							className="bg-white p-2 rounded-md mb-4"
						/>
						<p className="mt-3 text-sm leading-relaxed text-white/80">
							Unity Life Health Care (ULHC) is dedicated to delivering genuine
							healthcare savings and trusted medical support for individuals and
							families.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-sm font-semibold">Quick Links</h4>
						<ul className="mt-4 space-y-2 text-sm">
							{[
								{ name: "Home", href: "/" },
								{ name: "About", href: "/about" },
								{ name: "Health Care Program", href: "/hcp" },
								{ name: "Empanelment", href: "/empanelment" },
								{ name: "Contact", href: "/contact" },
							].map((link, idx) => (
								<li key={idx}>
									<Link
										href={link.href}
										className="hover:text-white/80 transition">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources (optional – can remove if not needed) */}
					<div>
						<h4 className="text-sm font-semibold">Resources</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link
									href="/legals/hcp-guidelines"
									className="hover:text-white/80 transition">
									HCP guidelines
								</Link>
							</li>
							<li>
								<Link
									href="/legals/privacy-policy"
									className="hover:text-white/80 transition">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/legals/terms-and-conditions"
									className="hover:text-white/80 transition">
									Terms & Conditions
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-sm font-semibold">Contact</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>📧 info@unitylifehealthcare.com</li>
							<li className="flex flex-col">
								<span className="font-medium">
									🏢 Unity Life Health Care (ULHC)
								</span>
								<span className="text-sm ">Hyderabad, Telangana, India</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="border-t border-white/20 bg-[#045e5a]/90">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-4 text-center text-xs">
					<p>
						© {new Date().getFullYear()} Unity Life Health Care. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

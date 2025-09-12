"use client";

import Link from "next/link";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaXTwitter,
} from "react-icons/fa6";

const BRAND = "#045e5a";

export default function Footer() {
	return (
		<footer className="relative bg-[#045e5a] text-white">
			{/* Top */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Logo + Mission */}
					<div>
						<h3 className="text-xl font-bold">ULHC</h3>
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
								"About Us",
								"Health Card Program",
								"Partners",
								"Join Us",
								"Contact",
							].map((link, idx) => (
								<li key={idx}>
									<Link
										href={`/${link.toLowerCase().replace(/\s/g, "")}`}
										className="hover:text-white/80 transition">
										{link}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h4 className="text-sm font-semibold">Resources</h4>
						<ul className="mt-4 space-y-2 text-sm">
							{["FAQs", "Blog", "Privacy Policy", "Terms & Conditions"].map(
								(link, idx) => (
									<li key={idx}>
										<Link
											href={`/${link.toLowerCase().replace(/\s/g, "")}`}
											className="hover:text-white/80 transition">
											{link}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-sm font-semibold">Contact</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>📞 [Phone Number]</li>
							<li>📧 [Email ID]</li>
							<li>🏢 Unity Life Health Care (ULHC)</li>
						</ul>
						{/* Social Icons */}
						<div className="mt-4 flex gap-3">
							{[
								{ icon: <FaFacebookF size={14} />, href: "#" },
								{ icon: <FaInstagram size={14} />, href: "#" },
								{ icon: <FaXTwitter size={14} />, href: "#" },
								{ icon: <FaLinkedinIn size={14} />, href: "#" },
							].map((social, idx) => (
								<a
									key={idx}
									href={social.href}
									className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white hover:text-[#045e5a] transition">
									{social.icon}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-white/20 bg-[#045e5a]/90">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-center text-xs sm:flex-row sm:text-left">
					<p>
						© {new Date().getFullYear()} Unity Life Health Care. All rights
						reserved.
					</p>
					<p>Designed with ❤️ for healthier communities.</p>
				</div>
			</div>
		</footer>
	);
}

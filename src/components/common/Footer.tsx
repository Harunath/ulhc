"use client";

import Link from "next/link";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className="relative bg-slate-900 text-slate-300">
			{/* Top */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Logo + Mission */}
					<div>
						<h3 className="text-xl font-bold text-white">ULHC</h3>
						<p className="mt-3 text-sm leading-relaxed text-slate-400">
							Unity Life Health Care (ULHC) is dedicated to delivering genuine
							healthcare savings and trusted medical support for individuals and
							families.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-sm font-semibold text-white">Quick Links</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link href="/about" className="hover:text-[#045e5a]">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/hcp" className="hover:text-[#045e5a]">
									Health Card Program
								</Link>
							</li>
							<li>
								<Link href="/partners" className="hover:text-[#045e5a]">
									Partners
								</Link>
							</li>
							<li>
								<Link href="/join" className="hover:text-[#045e5a]">
									Join Us
								</Link>
							</li>
							<li>
								<Link href="/contact" className="hover:text-[#045e5a]">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h4 className="text-sm font-semibold text-white">Resources</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>
								<Link href="/faq" className="hover:text-[#045e5a]">
									FAQs
								</Link>
							</li>
							<li>
								<Link href="/blog" className="hover:text-[#045e5a]">
									Blog
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="hover:text-[#045e5a]">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/terms" className="hover:text-[#045e5a]">
									Terms & Conditions
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-sm font-semibold text-white">Contact</h4>
						<ul className="mt-4 space-y-2 text-sm">
							<li>📞 [Phone Number]</li>
							<li>📧 [Email ID]</li>
							<li>🏢 Unity Life Health Care (ULHC)</li>
						</ul>
						{/* Social Icons */}
						<div className="mt-4 flex gap-3">
							<a
								href="#"
								className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-[#045e5a] hover:text-white transition">
								<FaFacebookF size={14} />
							</a>
							<a
								href="#"
								className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-[#045e5a] hover:text-white transition">
								<FaInstagram size={14} />
							</a>
							<a
								href="#"
								className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-[#045e5a] hover:text-white transition">
								<FaXTwitter size={14} />
							</a>
							<a
								href="#"
								className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-300 hover:bg-[#045e5a] hover:text-white transition">
								<FaLinkedinIn size={14} />
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-slate-700 bg-slate-900/80">
				<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
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

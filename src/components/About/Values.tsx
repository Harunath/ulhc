"use client";

import {
	FiDollarSign,
	FiUsers,
	FiFileText,
	FiCheckCircle,
	FiHeart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Children } from "react";

type Variant = "ribbon" | "diagonal" | "wheel";

const BRAND = "#045e5a";

/* ----------------- Updated Values (Immediate Access removed) ----------------- */
const values = [
	{
		key: "payments",
		title: "Guaranteed Payments",
		desc: "Minimum assured payments after patient approval.",
		Icon: FiDollarSign,
		badge: "Assurance",
	},
	{
		key: "occupancy",
		title: "Higher Occupancy",
		desc: "Maximize ward and surgical unit utilization with steady referrals.",
		Icon: FiUsers,
		badge: "Growth",
	},
	{
		key: "community",
		title: "Trusted Association",
		desc: "Partner with a community-trusted healthcare initiative.",
		Icon: FiHeart,
		badge: "Trust",
	},
	{
		key: "support",
		title: "Admin Support",
		desc: "Help with documentation, approvals, and payment processing.",
		Icon: FiFileText,
		badge: "Ease",
	},
	{
		key: "agreement",
		title: "Simple Empanelment",
		desc: "Clear agreements and quick onboarding with dedicated support.",
		Icon: FiCheckCircle,
		badge: "Clarity",
	},
];

/* ----------------- Main Component ----------------- */
export default function ValuesULHC({
	variant = "ribbon",
}: {
	variant?: Variant;
}) {
	if (variant === "diagonal")
		return <div>DiagonalTiles variant not implemented</div>;
	if (variant === "wheel")
		return <div>WheelOfValues variant not implemented</div>;
	return <RibbonMosaic />;
}

/* =========================
   Variant 1 — Ribbon Mosaic
========================= */
function RibbonMosaic() {
	return (
		<section className="relative overflow-hidden bg-white">
			{/* flowing ribbon bg */}
			<div
				aria-hidden
				className="absolute inset-0 -z-10"
				style={{
					background: `linear-gradient(115deg, ${BRAND}14 0%, transparent 22%), 
             linear-gradient(295deg, ${BRAND}0F 0%, transparent 28%),
             radial-gradient(1200px 400px at -10% 10%, ${BRAND}10, transparent 60%), 
             radial-gradient(900px 300px at 110% 70%, ${BRAND}0F, transparent 60%)`,
				}}
			/>
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				<Header
					title="Value Proposition for Hospitals"
					subtitle="Offers hospitals reliable revenue, higher utilization, and a trusted partnership."
				/>

				{/* ribbon lanes */}
				<div className="relative mt-10 space-y-6">
					{/* Lane 1 */}
					<RibbonLane tilt={-2}>
						<ValueCard item={values[0]} />
						<ValueCard item={values[1]} />
					</RibbonLane>
					{/* Lane 2 */}
					<RibbonLane tilt={2} offset>
						<ValueCard item={values[2]} />
						<ValueCard item={values[3]} />
					</RibbonLane>
					{/* Lane 3 (single card, centered, no empty space) */}
					<RibbonLane tilt={-1}>
						<ValueCard item={values[4]} />
					</RibbonLane>
				</div>
			</div>
		</section>
	);
}

function RibbonLane({
	children,
	tilt = 0,
	offset = false,
}: {
	children: React.ReactNode;
	tilt?: number;
	offset?: boolean;
}) {
	const count = Children.count(children);
	const gridCols = count === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
	const centerWhenSingle = count === 1 ? "max-w-xl mx-auto" : "";

	return (
		<div
			className={[
				"relative rounded-3xl p-3 sm:p-4",
				offset ? "sm:ml-14" : "",
				"ring-1 ring-slate-200/70",
			].join(" ")}
			style={{
				transform: `rotate(${tilt}deg)`,
				background: `linear-gradient(90deg, ${BRAND}10, transparent, ${BRAND}10)`,
				backdropFilter: "blur(2px)",
			}}>
			<div
				className={`grid items-stretch gap-4 ${gridCols} ${centerWhenSingle}`}
				style={{ transform: `rotate(${-tilt}deg)` }}>
				{children}
			</div>
		</div>
	);
}

function ValueCard({ item }: { item: (typeof values)[number] }) {
	const { title, desc, Icon, badge } = item;
	return (
		<motion.article
			initial={{ opacity: 0, y: 14 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
			className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
			{/* badge */}
			<span
				className="inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1"
				style={{
					color: BRAND,
					backgroundColor: `${BRAND}12`,
					boxShadow: `inset 0 0 0 1px ${BRAND}26`,
				}}>
				{badge}
			</span>

			<div className="mt-3 flex items-start gap-4">
				<div
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1"
					style={{
						color: BRAND,
						backgroundColor: `${BRAND}14`,
						boxShadow: `inset 0 0 0 1px ${BRAND}1F`,
					}}>
					<Icon className="h-5 w-5" />
				</div>
				<div>
					<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
					<p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
				</div>
			</div>

			<div
				className="mt-5 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
				style={{ backgroundColor: BRAND }}
			/>
		</motion.article>
	);
}

/* ---------------- Shared Header ---------------- */
function Header({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<div className="mx-auto max-w-3xl text-center">
			<span
				className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
				style={{
					color: BRAND,
					backgroundColor: `${BRAND}1A`,
					boxShadow: `inset 0 0 0 1px ${BRAND}33`,
				}}>
				{title}
			</span>
			<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
				Benefits of Empanelment
			</h2>
			<p className="mt-3 text-slate-600">{subtitle}</p>
		</div>
	);
}

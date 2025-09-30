import { FiHeart, FiUserCheck, FiDollarSign } from "react-icons/fi";

const BRAND = "#045e5a";

export default function Mission() {
	return (
		<section className="relative bg-white">
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span
						className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1"
						style={{
							color: BRAND,
							backgroundColor: `${BRAND}1A`,
							boxShadow: `inset 0 0 0 1px ${BRAND}33`,
						}}>
						Our Mission
					</span>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Bridging Healthcare Gaps
					</h2>
					<p className="mt-3 text-slate-600">
						To bridge healthcare gaps by providing affordable treatment,
						dependable hospital access, and genuine care for every member.
					</p>
				</div>

				{/* Mission points */}
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[
						{
							title: "Affordable Treatment",
							desc: "Ensuring that every member can receive quality healthcare without financial strain.",
							icon: <FiDollarSign className="h-6 w-6" />,
						},
						{
							title: "Dependable Hospital Access",
							desc: "Partnering with empaneled hospitals and reliable doctors for accessible and trusted care.",
							icon: <FiUserCheck className="h-6 w-6" />,
						},
						{
							title: "Genuine Care",
							desc: "Delivering efficient, member-focused healthcare with compassion at its core.",
							icon: <FiHeart className="h-6 w-6" />,
						},
					].map((item) => (
						<div
							key={item.title}
							className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md">
							<div
								className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl ring-1"
								style={{
									color: BRAND,
									backgroundColor: `${BRAND}14`,
									boxShadow: `inset 0 0 0 1px ${BRAND}1F`,
								}}>
								{item.icon}
							</div>
							<h3 className="mt-4 text-lg font-semibold text-slate-900">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-slate-600">
								{item.desc}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Background accent */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(closest-side, rgba(4,94,90,0.12), transparent)",
				}}
			/>
		</section>
	);
}

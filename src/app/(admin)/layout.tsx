import { authOptions } from "@/lib/auth/authoptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Role } from "../../lib/prisma";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/admin/dashboard" },
	{ label: "Partners", href: "/admin/partners" },
	{ label: "Settings", href: "/admin/settings" },
];

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session || session.user?.role !== Role.ADMIN) {
		redirect("/auth/signin");
	}

	return (
		<div className="flex min-h-screen bg-gray-100">
			<ToastContainer />
			<aside className="w-64 bg-gray-900 text-white flex flex-col">
				<div className="px-6 py-5 text-lg font-semibold border-b border-white/10">
					Admin Panel
				</div>

				<nav className="flex-1 px-3 py-4 space-y-1">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="block rounded-lg px-3 py-2 text-sm transition">
							{item.label}
						</Link>
					))}
				</nav>

				<div className="border-t border-white/10 px-6 py-4 text-xs text-gray-400">
					© {new Date().getFullYear()} Admin
				</div>
			</aside>

			<div className="flex flex-1 flex-col">
				<header className="flex items-center justify-between border-b bg-white px-6 py-4">
					<h1 className="text-lg font-semibold text-gray-900">
						Admin Dashboard
					</h1>

					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-600">{session.user.email}</span>

						<form action="/api/auth/signout" method="post">
							<button className="text-sm text-red-600 hover:underline">
								Logout
							</button>
						</form>
					</div>
				</header>

				<main className="flex-1 p-6">{children}</main>
			</div>
		</div>
	);
}

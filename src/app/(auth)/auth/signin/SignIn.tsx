"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const login = async () => {
		if (!email || !password) return;

		setLoading(true);
		setError("");

		const res = await signIn("credentials", {
			email,
			password,
			redirect: false, // IMPORTANT: handle redirect manually
		});

		setLoading(false);

		if (res?.error) {
			setError("Invalid email or password");
			return;
		}

		// Successful login → go to dashboard
		window.location.href = "/admin/dashboard";
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
				{/* Header */}
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
					<p className="mt-1 text-sm text-gray-500">
						Sign in to access the dashboard
					</p>
				</div>

				{/* Error */}
				{error && (
					<div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
						{error}
					</div>
				)}

				{/* Form */}
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="admin@example.com"
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
						/>
					</div>

					<button
						onClick={login}
						disabled={!email || !password || loading}
						className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60">
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</div>

				{/* Footer */}
				<div className="mt-6 text-center text-xs text-gray-400">
					Secure admin access
				</div>
			</div>
		</div>
	);
}

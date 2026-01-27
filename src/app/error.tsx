"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="rounded-lg bg-white p-8 shadow-md text-center space-y-4">
				<h2 className="text-xl font-semibold">Something went wrong</h2>

				<p className="text-sm text-gray-600">
					{process.env.NODE_ENV === "development"
						? error.message
						: "Unexpected error"}
				</p>

				<button
					onClick={reset}
					className="rounded bg-blue-600 px-4 py-2 text-white">
					Try again
				</button>
			</div>
		</div>
	);
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authoptions";

export async function requireAdmin() {
	const session = await getServerSession(authOptions);

	if (!session) {
		throw new Error("UNAUTHORIZED");
	}

	return session.user;
}

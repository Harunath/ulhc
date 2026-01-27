import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},

	pages: {
		signIn: "/auth/signin",
	},

	providers: [
		Credentials({
			name: "Admin Login",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const admin = await prisma.admin.findUnique({
					where: { email: credentials.email },
				});

				if (!admin || !admin.isActive) {
					return null;
				}

				const isValid = await bcrypt.compare(
					credentials.password,
					admin.password,
				);

				if (!isValid) {
					return null;
				}

				return {
					id: admin.id,
					name: admin.name,
					email: admin.email,
					role: admin.role,
				};
			},
		}),
	],

	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},

		session({ session, token }) {
			session.user.id = token.id;
			session.user.role = token.role;
			return session;
		},
	},
};

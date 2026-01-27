import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ["error"],
	});

if (process.env.NODE_ENV !== "production") {
	process.on("beforeExit", async () => {
		await prisma.$disconnect();
	});
}

// Re-export all generated Prisma exports
export * from "@prisma/client";
export type { PrismaClient } from "@prisma/client";

import "dotenv/config";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createProgram = async () => {
	const program = await prisma.program.create({
		data: {
			name: "VRKisan Parivaar Health Care Program",
			description: "Health care program for VRKisan Parivaar members",
		},
	});
	console.log("Created program:", program);
};

createProgram()
	.then(() => {
		console.log("Program creation script completed.");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Error during program creation:", error);
		process.exit(1);
	});

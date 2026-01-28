import States from "@/components/states/States";
import { prisma } from "@/lib/prisma";

export default async function StatesPage() {
	const states = await prisma.state.findMany({
		orderBy: { priority: "asc" },
	});

	return <States states={states} />;
}

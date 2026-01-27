import CreateDistricts from "@/components/partners/CreateDistricts";
import { prisma } from "@/lib/prisma";

export default async function Page() {
	const states = await prisma.state.findMany();
	return (
		<>
			<CreateDistricts states={states} />
		</>
	);
}

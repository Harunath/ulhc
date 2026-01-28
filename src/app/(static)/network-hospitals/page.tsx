import { prisma } from "@/lib/prisma";
import PartnersPublic from "@/components/Home/Partners";

export default async function HomePage() {
	const [partners, categories, types, states, districts] = await Promise.all([
		prisma.partner.findMany({
			where: { isActive: true },
			include: {
				category: true,
				type: true,
				state: true,
				district: true,
			},
			orderBy: { name: "asc" },
		}),
		prisma.partnerCategory.findMany({
			where: { isActive: true },
			orderBy: { priority: "asc" },
		}),
		prisma.partnerType.findMany({
			where: { isActive: true },
			orderBy: { priority: "asc" },
		}),
		prisma.state.findMany({
			where: { isActive: true },
			orderBy: { priority: "asc" },
		}),
		prisma.district.findMany({
			where: {
				isActive: true,
				state: {
					isActive: true,
				},
			},
			orderBy: { name: "asc" },
		}),
	]);

	return (
		<main>
			<PartnersPublic
				partners={partners}
				categories={categories}
				states={states}
				districts={districts}
			/>
		</main>
	);
}

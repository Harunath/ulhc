import Partners from "@/components/partners/Partners";
import { prisma } from "@/lib/prisma";

export default async function PartnersPage() {
	const [partners, categories, types, states, districts] = await Promise.all([
		prisma.partner.findMany({
			include: {
				category: true,
				type: true,
				state: true,
				district: true,
			},
			orderBy: { createdAt: "desc" },
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
		<Partners
			partners={partners}
			categories={categories}
			types={types}
			states={states}
			districts={districts}
		/>
	);
}

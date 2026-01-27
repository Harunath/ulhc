import Partners from "@/components/partners/Partners";
import { prisma } from "@/lib/prisma";
export default async function PartnersPage() {
	const partners = await prisma.partner.findMany({
		include: {
			category: true,
			type: true,
			state: true,
			district: true,
		},
		orderBy: { createdAt: "desc" },
	});

	const categories = await prisma.partnerCategory.findMany({
		where: { isActive: true },
		orderBy: { priority: "asc" },
	});

	const types = await prisma.partnerType.findMany({
		where: { isActive: true },
		orderBy: { priority: "asc" },
	});

	const states = await prisma.state.findMany({
		where: { isActive: true },
		orderBy: { priority: "asc" },
	});

	const districts = await prisma.district.findMany({
		where: { isActive: true },
	});

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

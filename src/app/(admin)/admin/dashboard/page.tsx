import { prisma } from "@/lib/prisma";
import Dashboard from "@/components/partners/Dashboard";

export default async function DashboardPage() {
	const [
		totalPartners,
		activePartners,
		inactivePartners,
		totalCategories,
		totalTypes,
		totalStates,
		totalDistricts,
		recentPartners,
	] = await Promise.all([
		prisma.partner.count(),
		prisma.partner.count({ where: { isActive: true } }),
		prisma.partner.count({ where: { isActive: false } }),
		prisma.partnerCategory.count(),
		prisma.partnerType.count(),
		prisma.state.count(),
		prisma.district.count(),
		prisma.partner.findMany({
			orderBy: { createdAt: "desc" },
			take: 10,
			include: {
				category: true,
				state: true,
			},
		}),
	]);

	return (
		<Dashboard
			stats={{
				totalPartners,
				activePartners,
				inactivePartners,
				totalCategories,
				totalTypes,
				totalStates,
				totalDistricts,
			}}
			recentPartners={recentPartners}
		/>
	);
}

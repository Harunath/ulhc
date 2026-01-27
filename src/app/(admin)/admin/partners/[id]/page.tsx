import PartnerViewEditForm from "@/components/partners/EditViewPartner";
import { prisma } from "@/lib/prisma";

type PageProps = {
	params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
	const { id } = await params;

	const [categories, types, states] = await Promise.all([
		prisma.partnerCategory.findMany(),
		prisma.partnerType.findMany(),
		prisma.state.findMany(),
	]);

	return (
		<PartnerViewEditForm
			id={id}
			categories={categories}
			types={types}
			states={states}
		/>
	);
};

export default Page;

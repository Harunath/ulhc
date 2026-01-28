import EditViewDistricts from "@/components/states/EditViewDistricts";

type PageProps = {
	params: Promise<{
		stateid: string;
		districtid: string;
	}>;
};

export default async function Page({ params }: PageProps) {
	const resolvedParams = await params;
	return <EditViewDistricts params={resolvedParams} />;
}

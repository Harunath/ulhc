import EditState from "@/components/states/ViewEditState";

type Props = {
	params: Promise<{
		stateid: string;
	}>;
};

export default async function StatePage({ params }: Props) {
	const { stateid } = await params;

	return <EditState stateid={stateid} />;
}

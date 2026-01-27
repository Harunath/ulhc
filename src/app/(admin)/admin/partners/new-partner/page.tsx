import CreateForm from "@/components/partners/CreateForm";
import { prisma } from "@/lib/prisma";
import React from "react";

const page = async () => {
	const categories = await prisma.partnerCategory.findMany();
	const types = await prisma.partnerType.findMany();
	const states = await prisma.state.findMany();
	return (
		<>
			<CreateForm categories={categories} types={types} states={states} />
		</>
	);
};

export default page;

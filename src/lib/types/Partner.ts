import z from "zod";

export const PartnerSchema = z.object({
	name: z.string().min(2),

	categoryId: z.uuid(),
	typeId: z.uuid(),

	stateId: z.uuid(),
	districtId: z.uuid(),

	address: z.string().min(5),
	logoUrl: z.url().optional().nullable(),

	isActive: z.boolean().optional().default(true),
});

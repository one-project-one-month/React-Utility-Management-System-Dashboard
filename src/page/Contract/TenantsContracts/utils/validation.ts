import z from "zod";

export const tenantsContractValidationSchema = z.object({
    roomNo: z.number({error: "Room No Is Required"}),
    contractId: z.number({ error: "Choose Contract Type"}),
    tenantId: z.number({ error: "Choose Tenant"}),
    createdDate: z.date( { error: "Choose Contract Date"}),
    expiryDate: z.date()
})


export const defaultValues = {
    contractId: 3,
    createdDate: new Date(),
    expiryDate: new Date()
}
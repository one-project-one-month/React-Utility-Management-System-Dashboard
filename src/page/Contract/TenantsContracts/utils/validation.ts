import z from "zod";

export const tenantsContractValidationSchema = z.object({
    roomNo: z.string({error: "Room No Is Required"}),
    contractId: z.string({ error: "Choose Contract Type"}),
    tenantId: z.number({ error: "Choose Tenant"}),
    createdDate: z.date( { error: "Choose Contract Date"}),
    expiryDate: z.date()
})

export const defaultValues = {
    roomNo: "",
    contractId: "",
    createdDate: new Date(),
    expiryDate: new Date()
}
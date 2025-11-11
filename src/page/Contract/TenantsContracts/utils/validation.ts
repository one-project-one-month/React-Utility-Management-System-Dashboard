import z from "zod";

export const tenantsContractValidationSchema = z.object({
    roomId: z.string({error: "Room No Is Required"}),
    contractTypeId: z.string({ error: "Choose Contract Type"}),
    tenantId: z.string({ error: "Choose Tenant"}),
    createdDate: z.date( { error: "Choose Contract Date"}),
    expiryDate: z.date()
})

export const defaultValues = {
    roomId: "",
    contractId: "",
    createdDate: new Date(),
    expiryDate: new Date()
}
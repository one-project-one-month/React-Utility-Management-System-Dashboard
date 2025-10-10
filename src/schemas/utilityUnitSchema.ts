import { z } from "zod";

export const utilityUnitSchema = z.object({
  bill_id: z.string("Bill ID must be string").nonempty("Bill ID is required"),
  electricity_unit: z
    .string("Electricity unit must be string")
    .nonempty("Electricity unit is required"),
  water_unit: z
    .string("Water unit must be string")
    .nonempty("Water unit is required"),
});

export type TUtilityUnit = z.infer<typeof utilityUnitSchema>;
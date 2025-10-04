import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number must be at least 7 characters")
  .regex(/^[+0-9\s-]+$/, "Phone number contains invalid characters");

const nrcPattern = /^([1-9]|1[0-4])\/[A-Z]{1,3}\(Naing\)\d{1,10}$/;

export const residentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Resident name is required")
    .max(200, "Name is too long"),
  nrc: z
    .string()
    .trim()
    .min(1, "NRC is required")
    .regex(nrcPattern, "NRC contains invalid characters")
    .max(100, "NRC is too long"),
});

export const tenantFormSchema = z.object({
  residents: z
    .array(residentSchema)
    .min(1, "At least one resident is required"),
  phoneNo: phoneSchema,
  email: z
    .string()
    .trim()
    .nullable()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      "Invalid email address",
    ),
  emergencyNo: phoneSchema,
  roomId: z.string().trim().min(1, "Room must be selected"),
  contractId: z.string().trim().min(1, "Contract must be selected"),
});

export type TenantFormValues = z.infer<typeof tenantFormSchema>;

import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number must be at least 7 characters")
  .regex(/^[+0-9\s-]+$/, "Phone number contains invalid characters");

const nrcPattern = /^([1-9]|1[0-4])\/[A-Z]{1,3}\(N\)\d{1,10}$/;

export const relationshipToTenantSchema = z.enum([
  "Spouse",
  "Child",
  "Parent",
  "Relative",
  "Friend",
  "Other",
]);

export const occupantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Occupant name is required")
    .max(200, "Name is too long"),
  nrc: z
    .string()
    .trim()
    .min(1, "NRC is required")
    .regex(nrcPattern, "NRC contains invalid characters")
    .max(100, "NRC is too long"),
  relationshipToTenant: relationshipToTenantSchema,
});

export const tenantFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Occupant name is required")
    .max(200, "Name is too long"),
  nrc: z
    .string()
    .trim()
    .min(1, "NRC is required")
    .regex(nrcPattern, "NRC contains invalid characters")
    .max(100, "NRC is too long"),
  occupants: z
    .array(occupantSchema)
    .min(1, "At least one occupant is required"),
  phoneNo: phoneSchema,
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  emergencyNo: phoneSchema,
  roomId: z.string().trim().min(1, "Room must be selected"),
  contractId: z.string().trim().min(1, "Contract must be selected"),
});

export type TenantFormValues = z.infer<typeof tenantFormSchema>;

import { z } from "zod";

const phoneSchema = z
   .string()
   .trim()
   .regex(
      /^09\d{7,9}$/,
      "Phone number must start with 09 and contain 9–11 digits total"
   );

const nrcPattern = /^([1-9]|1[0-4])\/[A-Z]{1,4}\(N\)\d{1,10}$/;

export const relationshipToTenantSchema = z.enum([
   "SPOUSE",
   "PARENT",
   "CHILD",
   "SIBLING",
   "RELATIVE",
   "FRIEND",
   "OTHER",
]);

export const occupantSchema = z.object({
   id: z.string().optional(),
   tenantId: z.string().optional(),
   name: z
      .string()
      .trim()
      .min(1, "Occupant name is required")
      .max(200, "Name is too long"),
   nrc: z
      .string()
      .trim()
      .max(100, "NRC is too long")
      .regex(nrcPattern, "NRC contains invalid characters")
      .or(z.literal("").transform(() => null))
      .nullable(),
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
   occupants: z.array(occupantSchema),
   phoneNo: phoneSchema,
   email: z.email("Invalid email address").trim().min(1, "Email is required"),
   emergencyNo: phoneSchema,
   roomId: z.string().trim().min(1, "Room must be selected"),
});

export type TenantFormValues = z.infer<typeof tenantFormSchema>;

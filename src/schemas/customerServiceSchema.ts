import {z} from "zod";

export const customerServiceEditSchema = z.object({
  category: z.enum(["complain", "maintenance", "other"], {
    error: "Category is required",
  }),
  status: z.enum(["pending", "ongoing", "resolved"], {
    error: "Status is required",
  }),
  priority: z.enum(["low", "medium", "high"], {
    error: "Priority is required",
  }),
});

export type CustomerServiceEditFormData = z.infer<typeof customerServiceEditSchema>;
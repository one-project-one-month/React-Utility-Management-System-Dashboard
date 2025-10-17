import {z} from "zod";

export const customerServiceEditSchema = z.object({
  category: z.enum(["Complain", "Maintenance", "Other"], {
    error: "Category is required",
  }),
  status: z.enum(["Pending", "Ongoing", "Resolved"], {
    error: "Status is required",
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    error: "Priority is required",
  }),
});

export type CustomerServiceEditFormData = z.infer<typeof customerServiceEditSchema>;
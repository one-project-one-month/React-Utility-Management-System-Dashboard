import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter",
    }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

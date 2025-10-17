import { z } from "zod";

export const userSchema = z.object({
    id: z.uuid().optional(),
    userName: z.string().min(1, "Username is required"),
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[a-zA-Z]/, {
            message: "Password must contain at least one letter",
        }),
    role: z.enum(["tenant", "staff", "admin"]),
    isActive: z.boolean().default(true),
    tenantId: z.string().nullable(),
});

export const createUserSchema = userSchema.omit({ id: true });
export const editUserSchema = userSchema
    .omit({ password: true })
    .extend({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[a-zA-Z]/, {
                message: "Password must contain at least one letter",
            })
            .optional()
    });

export type User = z.infer<typeof userSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditUserFormData = z.infer<typeof editUserSchema>;

export interface UserList {
    id: string;
    userName: string;
    email: string;
    password: string;
    phNumber: string;
    role: "tenant" | "staff" | "admin";
    tenantId: string | null;
    emergencyNo: string;
    isActive: boolean;
}

export interface UserDetails extends UserList {
    room: number;
    nrc: string;
}
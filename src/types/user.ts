import { z } from "zod";

const tenantSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    roomId: z.uuid()
});

const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" });

export const userSchema = z.object({
    id: z.uuid().optional(),
    userName: z.string().min(1, "Username is required"),
    email: z.email({ message: "Invalid email address" }),
    password: passwordSchema,
    role: z.enum(["Tenant", "Staff", "Admin"]),
    isActive: z.boolean().default(true),
    tenantId: z.uuid().nullable().optional(),
    tenant: tenantSchema.nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    tenant: true
});

export const editUserSchema = userSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        tenant: true,
        password: true
    })
    .extend({
        password: z.string().optional().or(z.literal(""))
    });

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditUserFormData = z.infer<typeof editUserSchema>;

export type Tenant = z.infer<typeof tenantSchema>;
export type User = z.infer<typeof userSchema>;

interface PaginationMeta {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
}

interface PaginationLink {
    next: string | null;
    prev: string | null;
}

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    content: T;
    status: number;
}

export type UserResponse<T> = ApiResponse<{ user: T }>;

export type CreateUserResponse = UserResponse<CreateUserFormData>;
export type EditUserResponse = UserResponse<EditUserFormData>;
export type DeleteUserResponse = UserResponse<{
    data: User
}>
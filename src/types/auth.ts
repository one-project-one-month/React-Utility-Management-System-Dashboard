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

export type User = {
   id: string;
   email: string;
   user_name: string;
   role: string;
   tenant_id: null | string;
   is_active: boolean;
   created_at: string;
   updated_at: string;
};
export type LoginResponse = {
   success: boolean;
   message: string;
   content: {
      accessToken: string;
      refreshToken: string;
      user: User;
   };
   status: number;
};

type RefreshTokenWithoutUser = Omit<LoginResponse["content"], "user">;

export type RefreshTokenResponse = Omit<LoginResponse, "content"> & {
   content: RefreshTokenWithoutUser;
};

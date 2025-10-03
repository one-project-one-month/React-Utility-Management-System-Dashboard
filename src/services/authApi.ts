import type { LoginResponse, TLoginSchema } from "@/types/auth";
import axiosInstance from "./axiosInstance";

export const login = async (formData: TLoginSchema): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>("auth/login", formData);
  return res.data;
};

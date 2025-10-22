import type { Billing } from "@/types/billing/billingType.ts";
import axiosInstance from "@/services/axiosInstance.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";

export const getAllBillings = async (): Promise<ApiContent<Billing[]>> => {
  const response = await axiosInstance.get<ApiResponse<Billing[]>>("bills");

  return response.data.content;
};

export const getBillingsById = async (
  billingId: string,
): Promise<ApiContent<Billing>> => {
  const response = await axiosInstance.get<ApiResponse<Billing>>(
    `bills/${billingId}`,
  );

  return response.data.content;
};

export const autoGenerateBill = async (): Promise<ApiContent<Billing>> => {
  const response = await axiosInstance.get<ApiResponse<Billing>>(
    "bills/auto-generate",
  );
  return response.data.content;
};

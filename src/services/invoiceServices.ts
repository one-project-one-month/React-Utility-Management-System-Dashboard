import axiosInstance from "@/services/axiosInstance.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import type { Invoice } from "@/types/invoices/invoiceType.ts";

export const getAllInvoices = async (): Promise<ApiContent<Invoice[]>> => {
  const response = await axiosInstance.get<ApiResponse<Invoice[]>>("invoices");

  return response.data.content;
};

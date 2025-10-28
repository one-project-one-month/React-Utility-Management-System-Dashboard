import type { Billing } from "@/types/billing/billingType.ts";
import axiosInstance from "@/services/axiosInstance.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";

export interface GetBillingsParams {
  search?: string;
  status?: BillingStatus;
  currentPage?: number;
  limit?: number;
}

export const getAllBillings = async ({
  search,
  status,
  currentPage,
  limit,
}: GetBillingsParams): Promise<ApiContent<Billing[]>> => {
  const response = await axiosInstance.get<ApiResponse<Billing[]>>("bills", {
    params: {
      search: search && search?.length > 1 ? search : undefined,
      status: status ?? undefined,
      page: currentPage,
      limit: limit,
    },
  });

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

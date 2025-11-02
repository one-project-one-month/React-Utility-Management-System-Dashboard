import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import axiosInstance from "@/services/axiosInstance.ts";
import type { Billing } from "@/types/billing/billingType.ts";
import type { CustomerService } from "@/constants/mockData/tenants/mockServices.ts";
import type { Contract } from "@/types/tenants/tenantType.ts";

export const getBillingHistoryByTenantId = async (
  tenantId: string,
): Promise<ApiContent<Billing[]>> => {
  const response = await axiosInstance.get<ApiResponse<Billing[]>>(
    `/tenants/${tenantId}/bills/history`,
  );
  return response.data.content;
};

export const getCustomerServiceHistoryByTenantId = async (
  tenantId: string,
): Promise<ApiContent<CustomerService[]>> => {
  const response = await axiosInstance.get<ApiResponse<CustomerService[]>>(
    `/tenants/${tenantId}/customer-services/history`,
  );

  return response.data.content;
};

export const getContractHistoryByTenantId = async (
  tenantId: string,
): Promise<ApiContent<Contract>> => {
  const response = await axiosInstance.get<ApiResponse<Contract>>(
    `/tenants/${tenantId}/contracts`,
  );
  return response.data.content;
};

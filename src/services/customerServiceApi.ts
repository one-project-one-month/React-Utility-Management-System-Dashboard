import axiosInstance from "@/services/axiosInstance";
import type { CustomerService } from "@/types/customer-service";
import type { Pagination } from "@/types/pagination";
import { buildQueryParams } from "./utils";
import type { ApiResponse } from "./apiResponse";

export const fetchCustomerServices = async (
  pagination: Pagination,
  filters?: any
) => {
  const query = buildQueryParams({
    ...pagination,
    filter: filters,
  });
  const res = await axiosInstance.get<ApiResponse<CustomerService>>(
    `/customer-services?${query}`
  );
  return res.data;
};

export const updateCustomerService = async (id: string, updates: any) => {
  const res = await axiosInstance.put<ApiResponse<CustomerService>>(
    `/customer-services/${id}`,
    updates
  );
  return res.data;
};

export const deleteCustomerService = async (id: string) => {
  const res = await axiosInstance.delete<ApiResponse<CustomerService>>(
    `/customer-services/${id}`
  );
  return res.data;
};

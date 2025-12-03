import axiosInstance from "@/services/axiosInstance.ts";
import type { ApiContent, ApiResponse } from "@/types/ApiResponse/ApiResponse.ts";
import type { Tenant } from "@/types/tenants/tenantType.ts";
import type { TenantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";
import type { Pagination } from "@/types/pagination.ts";
import { buildQueryParams } from "@/services/utils";

export const fetchAllTenants = async (pagination: Pagination, search?: string) => {
   const query = buildQueryParams(pagination);
   const response = await axiosInstance.get<ApiResponse<Tenant[]>>(
      `tenants?${query}${search ? `&search=${encodeURIComponent(search)}` : ""}`
   );
   return response.data.content;
};

export const getTenantById = async (
   tenantId: string
): Promise<ApiContent<Tenant>> => {
   const response = await axiosInstance.get<ApiResponse<Tenant>>(
      `tenants/${tenantId}`
   );
   return response.data.content;
};

export const createTenant = async (
   newTenant: TenantPayload
): Promise<ApiContent<Tenant>> => {
   const response = await axiosInstance.post<ApiResponse<Tenant>>(
      "tenants",
      newTenant
   );

   return response.data.content;
};

export const updateTenant = async (
   id: string,
   updatedTenant: TenantPayload
): Promise<ApiContent<Tenant>> => {
   const response = await axiosInstance.put<ApiResponse<Tenant>>(
      `tenants/${id}`,
      updatedTenant
   );

   return response.data.content;
};

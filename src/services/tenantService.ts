import axiosInstance from "@/services/axiosInstance.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import type { Occupancy, Tenant } from "@/types/tenants/tenantType.ts";
import type { TenantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";

export interface GetTenantsParams {
  currentPage?: number;
  limit?: number;
  search?: string;
  occupancy?: Occupancy;
}

export const getAllTenants = async ({
  currentPage,
  limit,
  search,
  occupancy,
}: GetTenantsParams): Promise<ApiContent<Tenant[]>> => {
  const response = await axiosInstance.get<ApiResponse<Tenant[]>>("tenants", {
    params: {
      page: currentPage,
      limit: limit,
      search: search && search?.length > 1 ? search : undefined,
      occupancy: occupancy ?? undefined,
    },
  });

  return response.data.content;
};

export const getTenantById = async (
  tenantId: string,
): Promise<ApiContent<Tenant>> => {
  const response = await axiosInstance.get<ApiResponse<Tenant>>(
    `tenants/${tenantId}`,
  );
  return response.data.content;
};

export const createTenant = async (
  newTenant: TenantPayload,
): Promise<ApiContent<Tenant>> => {
  const response = await axiosInstance.post<ApiResponse<Tenant>>(
    "tenants",
    newTenant,
  );

  return response.data.content;
};
export const updateTenant = async (
  id: string,

  updatedTenant: TenantPayload,
): Promise<ApiContent<Tenant>> => {
  const response = await axiosInstance.put<ApiResponse<Tenant>>(
    `tenants/${id}`,
    updatedTenant,
  );

  return response.data.content;
};

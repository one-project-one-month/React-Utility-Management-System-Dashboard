import axiosInstance from "@/services/axiosInstance.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import type { Tenant } from "@/types/tenants/tenantType.ts";

export const getAllTenants = async (): Promise<ApiContent<Tenant[]>> => {
  const response = await axiosInstance.get<ApiResponse<Tenant[]>>("tenants");

  return response.data.content;
};

export interface OccupantPayload {
  id?: string;
  name: string;
  nrc: string;
  relationshipToTenant: string;
}

export interface TenantPayload {
  name: string;
  nrc: string;
  occupants?: OccupantPayload[];
  email: string;
  phoneNo: string;
  emergencyNo: string;
  roomId?: string;
}

export const createTenant = async (
  newTenant: TenantPayload,
): Promise<ApiContent<Tenant>> => {
  const response = await axiosInstance.post<ApiResponse<Tenant>>(
    "tenants",
    newTenant,
  );

  return response.data.content;
};

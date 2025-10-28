import type { OccupantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";
import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";
import type { Occupant } from "@/types/tenants/tenantType.ts";
import axiosInstance from "@/services/axiosInstance.ts";

export const createOccupant = async (
  newOccupants: OccupantPayload[],
): Promise<ApiContent<Occupant[]>> => {
  const response = await axiosInstance.post<ApiResponse<Occupant[]>>(
    "occupants",
    newOccupants,
  );

  return response.data.content;
};
export const updateOccupant = async (
  id: string,
  updatedOccupant: OccupantPayload,
): Promise<ApiContent<Occupant>> => {
  const response = await axiosInstance.put<ApiResponse<Occupant>>(
    `occupants/${id}`,
    updatedOccupant,
  );

  return response.data.content;
};

export const deleteOccupant = async (
  id: string,
  tenantId: string,
): Promise<ApiContent<Occupant>> => {
  const response = await axiosInstance.delete<ApiResponse<Occupant>>(
    `occupants/${id}`,
    {
      data: { tenantId },
    },
  );

  return response.data.content;
};

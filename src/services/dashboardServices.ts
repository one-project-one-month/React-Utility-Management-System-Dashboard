import axiosInstance from "@/services/axiosInstance.ts";
import type { ApiResponse } from "@/types/ApiResponse/ApiResponse.ts";

export const getRevenueByMonthAndYear = async (month: string, year: string) => {
  const response = await axiosInstance.get<ApiResponse<number>>(
    `bills/revenue`,
    {
      params: {
        month,
        year,
      },
    },
  );
  return response.data.content;
};

export const getActiveTenantsCount = async () => {
  const response = await axiosInstance.get<ApiResponse<number>>(
    `tenants/active-tenants-count`,
  );
  return response.data.content;
};

export const getAllRoomsCount = async () => {
  const response = await axiosInstance.get<ApiResponse<number>>(`rooms/count`);
  return response.data.content;
};

export const getALlPendingIssuesCount = async () => {
  const response = await axiosInstance.get<ApiResponse<number>>(
    `issues/pending-issues-count`,
  );
  return response.data.content;
};

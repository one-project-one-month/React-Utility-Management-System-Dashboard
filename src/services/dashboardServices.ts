import axiosInstance from "@/services/axiosInstance.ts";
import type { ApiResponse } from "@/types/ApiResponse/ApiResponse.ts";

export type MonthParamForRevenue =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export interface RevenueByMonthResponse {
  thisMonthRevenue: number;
  prevMonthRevenue: number;
}
export const getRevenueByMonthAndYear = async (month: MonthParamForRevenue) => {
  const response = await axiosInstance.get<ApiResponse<RevenueByMonthResponse>>(
    `bills/revenue-by-month`,
    {
      params: {
        month,
      },
    },
  );
  return response.data.content;
};

export const getActiveTenantsCount = async () => {
  const response =
    await axiosInstance.get<ApiResponse<number>>(`tenants/active-count`);
  return response.data.content;
};

export interface RoomCountResponse {
  allRoomsCount: number;
  roomStatusCount: number;
}

export const getAllRoomsCount = async () => {
  const response =
    await axiosInstance.get<ApiResponse<RoomCountResponse>>(`rooms/counts`);
  return response.data.content;
};

export interface IssuesCountResponse {
  statusCount: number;
  priorityLevelCount: number;
  statusAndPriorityCount: number;
}
export const getALlPendingIssuesCount = async () => {
  const response = await axiosInstance.get<ApiResponse<IssuesCountResponse>>(
    `customer-services/counts?status=Pending&priorityLevel=High`,
  );
  return response.data.content;
};

export interface TotalUnitsByMonth {
  month: string;
  totalUnits: number;
}
export const getTotalUnitsByMonth = async () => {
  const response = await axiosInstance.get<ApiResponse<TotalUnitsByMonth[]>>(
    "total-units/summary",
  );
  return response.data.content;
};

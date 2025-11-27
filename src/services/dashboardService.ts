import type {
   BillAnalytics,
   ContractAnalytics,
   CustomerServiceCategory,
   CustomerServiceFilter,
   CustomerServicePriority,
   CustomerServiceStatus,
   RevenueAnalytics,
   RoomAnalytics,
} from "@/types/dashboard";
import type { ApiResponse } from "./apiResponse";
import axiosInstance from "./axiosInstance";

export const fetchContractAnalysis = async () => {
   const response = await axiosInstance.get<ApiResponse<ContractAnalytics[]>>(
      "analytics/contract-types/tenant-counts"
   );

   return response.data.content;
};

export const fetchRoomAnalytics = async () => {
   const response = await axiosInstance.get<ApiResponse<RoomAnalytics[]>>(
      "analytics/rooms/status-counts"
   );

   return response.data.content;
};

export const fetchBillAnalytics = async (month?: number) => {
   const currentMonth = new Date().getMonth() + 1;
   const targetMonth = month ?? currentMonth;

   const response = await axiosInstance.get<ApiResponse<BillAnalytics>>(
      `analytics/bills/amount-by-status?month=${targetMonth}`
   );

   return response.data.content;
};

export const fetchRevenueByMonth = async () => {
   const response = await axiosInstance.get<ApiResponse<RevenueAnalytics>>(
      "analytics/bills/revenue-by-month"
   );

   return response.data.content;
};

export const fetchCustomerServiceAnalytics = async (
   filter: CustomerServiceFilter
) => {
   const params = new URLSearchParams({
      query: filter.query,
      from: filter.from.toISOString(),
      to: filter.to.toISOString(),
   });

   if (filter.status) {
      params.append("status", filter.status);
   }

   const response = await axiosInstance.get<
      ApiResponse<
         CustomerServiceCategory | CustomerServicePriority | CustomerServiceStatus
      >
   >(`analytics/customer-services-counts?${params.toString()}`);

   return response.data.content;
};

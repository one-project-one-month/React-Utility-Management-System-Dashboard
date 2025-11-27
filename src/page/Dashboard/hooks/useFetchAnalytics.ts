import { fetchBillAnalytics, fetchContractAnalysis, fetchCustomerServiceAnalytics, fetchRevenueByMonth, fetchRoomAnalytics } from "@/services/dashboardService";
import type { CustomerServiceFilter } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useFetchContractTypesAnalytics = () => {
   return useQuery({
      queryKey: ["contract-types-analytics"],
      queryFn: () => fetchContractAnalysis(),
      select: analytics => {
         return analytics.data.filter(analytic => analytic.tenantCount > 0);
      },
   });
};

export const useFetchRoomAnalytics = () => {
   return useQuery({
      queryKey: ['room-analytics'],
      queryFn: () => fetchRoomAnalytics()
   })
}

export const useFetchBillAnalytics = (month?: number) => {
    return useQuery({
        queryKey: ["billAnalytics", month],
        queryFn: () => fetchBillAnalytics(month),
    });
};


export const useFetchRevenueAnalytics = () => {
   return useQuery({
      queryKey: ['revenue-analytics'],
      queryFn: () => fetchRevenueByMonth()
   })
}

export const useFetchCustomerServiceAnalytics = (filter: CustomerServiceFilter) => {
   return useQuery({
      queryKey: ['service-analytics', filter],
      queryFn: () => fetchCustomerServiceAnalytics(filter)
   })
}
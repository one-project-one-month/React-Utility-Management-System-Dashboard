import { useQuery } from "@tanstack/react-query";
import {
  getActiveTenantsCount,
  getALlPendingIssuesCount,
  getAllRoomsCount,
  getRevenueByMonthAndYear,
  getTotalUnitsByMonth,
  type MonthParamForRevenue,
} from "@/services/dashboardServices.ts";

export const useGetRevenueByMonthAndYear = (month: MonthParamForRevenue) => {
  return useQuery({
    queryKey: ["billingsByMonthAndYear"],
    queryFn: () => getRevenueByMonthAndYear(month),
  });
};

export const useGetActiveTenantsCount = () => {
  return useQuery({
    queryKey: ["activeTenants"],
    queryFn: getActiveTenantsCount,
  });
};

export const useGetAllRoomsCount = () => {
  return useQuery({
    queryKey: ["allRoomsCount"],
    queryFn: getAllRoomsCount,
  });
};

export const useGetPendingIssuesCount = () => {
  return useQuery({
    queryKey: ["pendingIssuesCount"],
    queryFn: getALlPendingIssuesCount,
  });
};

export const useGetTotalUnitsByMonth = () => {
  return useQuery({
    queryKey: ["totalUnitsByMonth"],
    queryFn: getTotalUnitsByMonth,
  });
};

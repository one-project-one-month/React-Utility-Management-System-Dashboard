import { useQuery } from "@tanstack/react-query";
import {
  getActiveTenantsCount,
  getALlPendingIssuesCount,
  getAllRoomsCount,
  getRevenueByMonthAndYear,
} from "@/services/dashboardServices.ts";

interface MonthAndYear {
  month: string;
  year: string;
}
export const useGetRevenueByMonthAndYear = ({ month, year }: MonthAndYear) => {
  return useQuery({
    queryKey: ["billingsByMonthAndYear"],
    queryFn: () => getRevenueByMonthAndYear(month, year),
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

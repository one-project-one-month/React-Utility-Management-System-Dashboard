import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  autoGenerateBill,
  fetchAllBillings,
} from "@/services/billingServices.ts";
import type { Pagination } from "@/types/pagination";

export const useFetchBillings = (pagination: Pagination, search?: string) => {
  return useQuery({
    queryKey: ["billings", pagination, search],
    queryFn: () => fetchAllBillings(pagination, search),
  });
};

export const useAutoGenerateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["autoGenerateBillings"],
    mutationFn: autoGenerateBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
  });
};

// export const useBillings = ({
//   currentPage,
//   limit,
//   search,
//   status,
// }: GetBillingsParams) => {
//   const queryClient = useQueryClient();
//
//   const getAllBillingsQuery = useQuery({
//     queryKey: ["billings", currentPage, search, status],
//     queryFn: () => getAllBillings({ currentPage, limit, search, status }),
//   });
//
//   const autoGenerateBillingMutation = useMutation({
//     mutationKey: ["autoGenerateBillings"],
//     mutationFn: autoGenerateBill,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["billings"] });
//     },
//   });
//
//   return { getAllBillingsQuery, autoGenerateBillingMutation };
// };

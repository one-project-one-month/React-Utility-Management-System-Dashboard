import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchAllInvoices,
  sendReceipt,
  type SendReceiptPayload,
} from "@/services/invoiceServices.ts";
import type { Pagination } from "@/types/pagination.ts";

export const useFetchInvoices = (pagination: Pagination, search?: string) => {
  return useQuery({
    queryKey: ["invoices", pagination, search],
    queryFn: () => fetchAllInvoices(pagination, search),
  });
};

export const useSendReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sendReceipt"],
    mutationFn: ({ invoiceId, receiptId }: SendReceiptPayload) =>
      sendReceipt({ invoiceId, receiptId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
  });
};

// export const useInvoices = ({
//   currentPage,
//   limit,
//   search,
//   status,
// }: GetInvoicesParams) => {
//   const queryClient = useQueryClient();
//
//   const getAllInvoicesQuery = useQuery({
//     queryKey: ["invoices", currentPage, search, status],
//     queryFn: () => getAllInvoices({ currentPage, limit, search, status }),
//   });
//
//   const autoGenerateInvoiceMutation = useMutation({
//     mutationKey: ["autoGenerateInvoices"],
//     mutationFn: autoGenerateInvoice,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["invoices"] });
//       queryClient.invalidateQueries({ queryKey: ["billings"] });
//     },
//   });
//
//   const sendReceiptMutation = useMutation({
//     mutationKey: ["sendReceipt"],
//     mutationFn: ({ invoiceId, receiptId }: SendReceiptPayload) =>
//       sendReceipt({ invoiceId, receiptId }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["invoices"] });
//       queryClient.invalidateQueries({ queryKey: ["billings"] });
//     },
//   });
//
//   return {
//     getAllInvoicesQuery,
//     autoGenerateInvoiceMutation,
//     sendReceiptMutation,
//   };
// };

// export const useAutoGenerateInvoice = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["autoGenerateInvoices"],
//     mutationFn: autoGenerateInvoice,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["invoices"] });
//       queryClient.invalidateQueries({ queryKey: ["billings"] });
//     },
//   });
// };

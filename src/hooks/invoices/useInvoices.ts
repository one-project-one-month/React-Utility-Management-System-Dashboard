import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  autoGenerateInvoice,
  getAllInvoices,
  type GetInvoicesParams,
  sendReceipt,
  type SendReceiptPayload,
} from "@/services/invoiceServices.ts";

export const useInvoices = ({
  currentPage,
  limit,
  search,
  status,
}: GetInvoicesParams) => {
  const queryClient = useQueryClient();

  const getAllInvoicesQuery = useQuery({
    queryKey: ["invoices", currentPage, search, status],
    queryFn: () => getAllInvoices({ currentPage, limit, search, status }),
  });

  const autoGenerateInvoiceMutation = useMutation({
    mutationKey: ["autoGenerateInvoices"],
    mutationFn: autoGenerateInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
  });

  const sendReceiptMutation = useMutation({
    mutationKey: ["sendReceipt"],
    mutationFn: ({ invoiceId, receiptId }: SendReceiptPayload) =>
      sendReceipt({ invoiceId, receiptId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
  });

  return {
    getAllInvoicesQuery,
    autoGenerateInvoiceMutation,
    sendReceiptMutation,
  };
};

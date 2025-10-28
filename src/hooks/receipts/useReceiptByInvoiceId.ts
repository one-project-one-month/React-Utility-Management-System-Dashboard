import { useQuery } from "@tanstack/react-query";
import { getReceiptByInvoiceId } from "@/services/receiptServices.ts";

interface Props {
  invoiceId: string;
  isPaid: boolean;
}

export const useReceiptByInvoiceId = ({ invoiceId, isPaid }: Props) => {
  const getReceiptByInvoiceIdQuery = useQuery({
    queryKey: ["receiptByInvoiceId", invoiceId],
    queryFn: () => getReceiptByInvoiceId(invoiceId),
    enabled: isPaid,
  });

  return { getReceiptByInvoiceIdQuery };
};

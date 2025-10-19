import { createContext } from "react";

interface InvoiceTableContextType {
  sendingReceiptIds: string[];
  onSendReceipt: (invoiceId: string) => void;
}

export const InvoiceTableContext =
  createContext<InvoiceTableContextType | null>(null);

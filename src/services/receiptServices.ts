import type {
  ApiContent,
  ApiResponse,
} from "@/types/ApiResponse/ApiResponse.ts";

import axiosInstance from "@/services/axiosInstance.ts";
import type { Invoice } from "@/types/invoices/invoiceType.ts";

export interface Receipt {
  id: string;
  paymentMethod: "Cash" | "Card" | "BankTransfer" | string;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
  invoice: Invoice;
}

export const getReceiptByInvoiceId = async (
  invoiceId: string,
): Promise<ApiContent<Receipt>> => {
  const response = await axiosInstance.get<ApiResponse<Receipt>>(
    `receipts/invoices/${invoiceId}`,
  );
  return response.data.content;
};

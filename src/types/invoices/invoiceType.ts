export type InvoiceStatus = "Overdue" | "Paid" | "Pending" | "Cancelled";

export interface Invoice {
  id: string;
  status: InvoiceStatus;
  receiptSent: boolean;
  billId: string;
  invoiceNo: string;
  createdAt: string;
  updatedAt: string;
}

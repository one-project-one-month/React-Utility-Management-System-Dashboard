export type InvoiceStatus = "Overdue" | "Paid" | "Pending";

export interface Invoice {
  id: string;
  billingId: string;
  invoiceNo: string;
  status: InvoiceStatus;
  receiptSent: boolean;
}

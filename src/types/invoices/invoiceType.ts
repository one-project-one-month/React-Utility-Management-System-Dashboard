export type InvoiceStatus = "Overdue" | "Paid" | "Pending";

export interface Invoice {
  id: string; // PK UniqueID
  billingId: string; // FK Billing Details
  invoiceNo: string;
  status: InvoiceStatus; // Overdue, Paid, or Pending
}

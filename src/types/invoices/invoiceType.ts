export type InvoiceStatus = "Overdue" | "Paid" | "Pending";

// export interface Invoice {
//   id: string;
//   status: InvoiceStatus;
//   receiptSent: boolean;
//   billId: string;
//   invoiceNo: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface Invoice {
  id: string;
  invoiceNo: string;
  status: "Pending" | "Paid" | "Overdue";
  receiptSent: boolean;
  billId: string;
  createdAt: string;
  updatedAt: string;
  tenantName: string;
  roomNo: string;
  totalAmount: number;
  billDueDate: string;
}

// constants/mockData/billing/mockInvoices.ts
import type { Invoice } from "@/types/invoices/invoiceType.ts";

export const mockInvoices: Invoice[] = [
  { id: "inv1", invoiceNo: "INV-0001", billingId: "b1", status: "Paid" },
  { id: "inv2", invoiceNo: "INV-0002", billingId: "b2", status: "Pending" },
  { id: "inv3", invoiceNo: "INV-0003", billingId: "b3", status: "Overdue" },
  { id: "inv4", invoiceNo: "INV-0004", billingId: "b4", status: "Paid" },
  { id: "inv5", invoiceNo: "INV-0005", billingId: "b5", status: "Pending" },
  { id: "inv6", invoiceNo: "INV-0006", billingId: "b6", status: "Overdue" },
  { id: "inv7", invoiceNo: "INV-0007", billingId: "b7", status: "Paid" },
  { id: "inv8", invoiceNo: "INV-0008", billingId: "b8", status: "Pending" },
  { id: "inv9", invoiceNo: "INV-0009", billingId: "b9", status: "Paid" },
  { id: "inv10", invoiceNo: "INV-0010", billingId: "b10", status: "Overdue" },
  { id: "inv11", invoiceNo: "INV-0011", billingId: "b11", status: "Pending" },
  { id: "inv12", invoiceNo: "INV-0012", billingId: "b12", status: "Paid" },
];

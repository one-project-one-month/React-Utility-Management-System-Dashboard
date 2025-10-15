// constants/mockData/billing/mockInvoices.ts
import type { Invoice } from "@/types/billing/invoiceType.ts";

export const mockInvoices: Invoice[] = [
  { id: "inv1", billingId: "b1", status: "Paid" },
  { id: "inv2", billingId: "b2", status: "Pending" },
  { id: "inv3", billingId: "b3", status: "Overdue" },
  { id: "inv4", billingId: "b4", status: "Paid" },
  { id: "inv5", billingId: "b5", status: "Pending" },
  { id: "inv6", billingId: "b6", status: "Overdue" },
  { id: "inv7", billingId: "b7", status: "Paid" },
  { id: "inv8", billingId: "b8", status: "Pending" },
  { id: "inv9", billingId: "b9", status: "Paid" },
  { id: "inv10", billingId: "b10", status: "Overdue" },
  { id: "inv11", billingId: "b11", status: "Pending" },
  { id: "inv12", billingId: "b12", status: "Paid" },
];

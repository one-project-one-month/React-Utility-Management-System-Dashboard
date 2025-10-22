import type { Billing } from "@/types/billing/billingType.ts";

export type BillingStatus = "Pending" | "Paid" | "Cancelled" | "Overdue";

export interface BillingTableData {
  no: number;
  tenantId: string;
  tenantName: string;
  roomNo: number;
  contractType: string;
  totalAmount: number;
  dueDate: string;
  status: BillingStatus;
  billingForAction: Billing;
}

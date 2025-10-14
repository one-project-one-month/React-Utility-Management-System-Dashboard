export type BillingStatus = "Pending" | "Paid" | "Overdue";

export interface BillingTableData {
  no: number;
  tenantId: string;
  tenantName: string;
  roomNo: number;
  contractType: string;
  totalAmount: number;
  dueDate: string;
  status: BillingStatus;
  billingIdForAction: string;
}

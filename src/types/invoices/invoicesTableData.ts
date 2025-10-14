import type { BillingStatus } from "@/types/billing/billingTableData.ts";

export interface InvoicesTableActions {
  onDownloadInvoice: () => void;
  onSendReceipt: () => void;
  disableSendReceipt: boolean;
}

export interface InvoicesTableData {
  no: number;
  invoiceNo: string;
  tenantName: string;
  roomNo: number;
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: BillingStatus;
  actions: InvoicesTableActions;
}

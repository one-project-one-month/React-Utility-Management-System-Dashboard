import type { BillingStatus } from "@/types/billing/billingTableData.ts";

import type { Billing, Invoice, Tenant } from "@/types/billing/billingType.ts";

export interface InvoicesTableActionsData {
  // onSendReceipt: () => void;
  // isSendingReceipt: boolean;
  actionData: {
    billing: Billing;
    invoice: Invoice;
    tenant: Tenant;
  };
}

export interface InvoicesTableData {
  no: number;
  invoiceNo: string;
  tenantName: string;
  roomNo: number;
  totalAmount: string;
  issueDate: string;
  dueDate: string;
  status: BillingStatus;
  actions: InvoicesTableActionsData;
}

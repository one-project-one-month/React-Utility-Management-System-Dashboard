import type { BillingStatus } from "@/types/billing/billingTableData.ts";
import type { Billing } from "@/types/billing/billingType.ts";
import type { Invoice } from "@/types/invoices/invoiceType.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";

export interface InvoicesTableActionsData {
  actionData: {
    billing: Billing;
    invoice: Invoice;
    tenant: TenantType;
  };
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
  actions: InvoicesTableActionsData;
}

import type { BillingStatus } from "@/types/billing/billingTableData.ts";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import type { Invoice } from "@/types/invoices/invoiceType.ts";
import type { InvoicesTableData } from "@/types/invoices/invoicesTableData.ts";
import { mockBillings } from "@/constants/mockData/billing/mockBillings.ts";
import type { Billing } from "@/types/billing/billingType.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";
// import { useState } from "react";

interface Props {
  page: number;
  pageSize: number;
  invoices: Invoice[];
}

export const useInvoiceToInvoiceTableData: (
  p: Props,
) => InvoicesTableData[] = ({ page, pageSize, invoices }: Props) => {
  return invoices.map((invoice, index) => {
    const no = (page - 1) * pageSize + index + 1;
    const invoiceNo = invoice.invoiceNo;

    const billing = mockBillings.find(
      (billing) => billing.id === invoice.billingId,
    );
    const roomId = billing?.roomId;

    const room = mockRooms.find((room) => room.id === roomId);

    const tenant = mockTenants.find((tenant) => tenant.roomId === roomId);
    const tenantName = tenant?.name[0] ?? "Not found";

    const roomNo = room?.roomNo ?? 0;
    const totalAmount = billing?.totalAmount ?? 0;
    const issueDate = billing?.createdDate ?? "";
    const dueDate = billing?.dueDate ?? "";
    const status = invoice?.status as BillingStatus;

    const actions = {
      actionData: {
        billing: billing as Billing,
        invoice,
        tenant: tenant as TenantType,
      },
    };
    return {
      no,
      invoiceNo,
      tenantName,
      roomNo,
      totalAmount,
      issueDate,
      dueDate,
      status,
      actions,
    };
  });
};

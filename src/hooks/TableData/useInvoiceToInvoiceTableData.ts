import type { InvoicesTableData } from "@/types/invoices/invoicesTableData.ts";

import type { Billing } from "@/types/billing/billingType.ts";
interface Props {
  page: number;
  pageSize: number;
  billings: Billing[];
}

export const useInvoiceToInvoiceTableData: (
  p: Props,
) => InvoicesTableData[] = ({ page, pageSize, billings }: Props) => {
  return billings.map((billing, index) => {
    const no = (page - 1) * pageSize + index + 1;
    const invoiceNo = billing.invoice.invoiceNo;
    const tenantName = billing.room.tenant.name;
    const roomNo = billing.room.roomNo;
    const totalAmount = billing.totalAmount;
    const issueDate = new Date(billing.createdAt).toLocaleDateString();
    const dueDate = new Date(billing.dueDate).toLocaleDateString();
    const status = billing.invoice.status;

    const actions = {
      // onSendReceipt,
      // isSendingReceipt,
      actionData: {
        billing: billing,
        tenant: billing.room.tenant,
        invoice: billing.invoice,
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

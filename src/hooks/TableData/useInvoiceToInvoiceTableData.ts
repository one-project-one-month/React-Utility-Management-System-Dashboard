import type { Invoice } from "@/types/invoices/invoiceType.ts";
import type { InvoicesTableData } from "@/types/invoices/invoicesTableData.ts";
import type { Billing } from "@/types/billing/billingType.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { useBillings } from "@/hooks/billings/useBillings.ts";

interface Props {
  // page: number;
  // pageSize: number;
  invoices: Invoice[];
}

export const useInvoiceToInvoiceTableData: (
  p: Props,
) => InvoicesTableData[] = ({ invoices }: Props) => {
  const { getAllBillingsQuery } = useBillings();
  const { data: content } = getAllBillingsQuery;
  const billings = content?.data;

  return invoices.map((invoice, index) => {
    const no = index + 1;
    const invoiceNo = invoice.invoiceNo;

    const billing = billings?.find((billing) => billing.id === invoice.billId);

    console.log("billing is", billing);

    const tenant = billing?.room.tenant;
    const tenantName = tenant?.name ?? "";
    const roomNo = billing?.room.roomNo ?? 0;
    const totalAmount = Number(billing?.totalAmount);
    const issueDate = new Date(
      billing?.invoice.createdAt ?? "",
    ).toLocaleDateString();
    const dueDate = new Date(billing?.dueDate ?? "").toLocaleDateString();
    const status = invoice.status;

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

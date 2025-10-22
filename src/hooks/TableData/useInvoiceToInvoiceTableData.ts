
import type { Invoice } from "@/types/invoices/invoiceType.ts";
import type { InvoicesTableData } from "@/types/invoices/invoicesTableData.ts";
import type { Billing } from "@/types/billing/billingType.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { useBillingById } from "@/hooks/billings/useBillingById.ts";
import { getBillingsById } from "@/services/billingServices.ts";


interface Props {
  // page: number;
  // pageSize: number;
  invoices: Invoice[];
}

export const useInvoiceToInvoiceTableData: (
  p: Props,
) => InvoicesTableData[] = ({  invoices }: Props) => {
  // const { getAllBillingsQuery } = useBillings();
  // const { data: content } = getAllBillingsQuery;
  // const billings = content?.data;

  const {getBillingByIdQuery} = useBillingById({ billingId:invoice.billId })

  const {data:content} = getBillingByIdQuery
  const billing = content?.bill

  return invoices.map((invoice, index) => {
    const no = index + 1;

    const {getBillingByIdQuery} = useBillingById({ billingId:invoice.billId })

    const {data:content} = getBillingByIdQuery
    const billing = content?.bill

    // const invoiceNo = invoice.invoiceNo;
    //
    // const billing = billings?.find(
    //   (billing) => billing.id === "39c29cc9-f27e-4f28-94d0-ef1044a9f2b6",
    // );
    // const roomId = billing?.roomId;
    //
    // const room = mockRooms.find((room) => room.id === "r1");
    //
    // const tenant = mockTenants.find((tenant) => tenant.roomId === "r1");
    // const tenantName = tenant?.name ?? "Not found";
    //
    // const roomNo = room?.roomNo ?? 0;
    // const totalAmount = billing?.totalAmount ?? 0;
    // const issueDate = billing?.createdDate ?? "";
    // const dueDate = billing?.dueDate ?? "";
    // const status = invoice?.status as BillingStatus;
    //
    // console.log("blling in invoice to table data: ", billing);
    // console.log("invoice in invoice to table data: ", invoice);

    const invoiceNo = invoice.invoiceNo
    const tenantName = billing.



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

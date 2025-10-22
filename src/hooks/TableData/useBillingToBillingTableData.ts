import type { Billing } from "@/types/billing/billingType.ts";
import type { BillingTableData } from "@/types/billing/billingTableData.ts";
import { formatDate } from "@/lib/utils.ts";

interface Props {
  // page: number;
  // pageSize: number;
  billings: Billing[];
}

export const useBillingToBillingTableData: (p: Props) => BillingTableData[] = ({
  // page,
  // pageSize,
  billings,
}: Props) => {
  return billings.map((billing, index) => {
    const billingForAction = billing;
    // console.log("page", page, "pageSize", pageSize, "index", index);
    // const no = (page - 1) * pageSize + index + 1;
    const no = index + 1;

    // const roomId = billing.roomId;
    // const room = mockRooms.find((room) => room.id === roomId);
    //
    // const tenant = mockTenants.find((tenant) => tenant.roomId === roomId);
    // const tenantId = tenant?.id ?? "";
    // const tenantName = tenant?.name ?? "Not found";
    // const roomNo = room?.roomNo ?? 0;
    //
    // const contract = mockContracts.find(
    //   (contract) => contract.tenantId === tenant?.id,
    // );
    // const contractType = contract?.contractName ?? "Not found";
    //
    // const totalAmount = billing.totalAmount ?? 0;
    // const dueDate = billing.dueDate;
    // const invoice = mockInvoices.find(
    //   (invoice) => invoice.billingId === billing.id,
    // );
    // const status = invoice?.status as BillingStatus;

    const tenantId = billing.room.tenant.id.split("-")[0];
    const tenantName = billing.room.tenant.name;
    const roomNo = billing.room.roomNo;
    const contractType = "Backend ကိုပြောရဦးမယ်";
    const totalAmount = +billing.totalAmount;

    const dueDate = formatDate(billing.dueDate);

    const status = billing.invoice.status;

    return {
      no,
      tenantId,
      tenantName,
      roomNo,
      contractType,
      totalAmount,
      dueDate,
      status,
      billingForAction,
    };
  });
};

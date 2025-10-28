import type { BillingTableData } from "@/types/billing/billingTableData.ts";
import type { Billing } from "@/types/billing/billingType.ts";

interface Props {
  page: number;
  pageSize: number;
  billings: Billing[];
}

export const useBillingToBillingTableData: (p: Props) => BillingTableData[] = ({
  page,
  pageSize,
  billings,
}: Props) => {
  return billings.map((billing, index) => {
    const billingForAction = billing;
    const no = (page - 1) * pageSize + index + 1;
    const tenantId = billing.room.tenant.id.split("-")[0];
    const tenantName = billing.room.tenant.name;
    const roomNo = billing.room.roomNo;
    const contractType = billing.room.contract.length
      ? billing.room.contract[0].contractType.name
      : "24 Months";
    const totalAmount = +billing.totalAmount;

    const dueDate = new Date(billing.dueDate).toLocaleDateString();

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

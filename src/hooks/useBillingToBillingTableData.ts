import type { Billing } from "@/types/billing/billingType.ts";
import type {
  BillingStatus,
  BillingTableData,
} from "@/types/billing/billingTableData.ts";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";
import { mockInvoices } from "@/constants/mockData/billing/mockInvoices.ts";

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
    const billingIdForAction = billing.id;
    const no = (page - 1) * pageSize + index + 1;

    const roomId = billing.roomId;
    const room = mockRooms.find((r) => r.id === roomId);

    const tenant = mockTenants.find((t) => t.roomId === roomId);
    const tenantId = tenant?.id ?? "";
    const tenantName = tenant?.name[0] ?? "Not found";
    const roomNo = room?.roomNo ?? 0;

    const contract = mockContracts.find((c) => c.tenantId === tenant?.id);
    const contractType = contract?.contractName ?? "Not found";

    const totalAmount = billing.totalAmount ?? 0;
    const dueDate = billing.dueDate;
    const invoice = mockInvoices.find((i) => i.billingId === billing.id);
    const status = invoice?.status as BillingStatus;

    return {
      no,
      tenantId,
      tenantName,
      roomNo,
      contractType,
      totalAmount,
      dueDate,
      status,
      billingIdForAction,
    };
  });
};

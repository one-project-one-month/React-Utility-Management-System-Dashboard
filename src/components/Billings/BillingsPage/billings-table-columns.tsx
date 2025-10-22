import { type ColumnDef } from "@tanstack/react-table";
import type {
  BillingStatus,
  BillingTableData,
} from "@/types/billing/billingTableData.ts";
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";
import StatusCell from "@/components/Invoices/InovoiceTableCells/status-cell.tsx";
import type { Billing } from "@/types/billing/billingType.ts";

export const billingTableColumnWidths: Record<string, string> = {
  no: "w-[6%]",
  tenantId: "w-[10%]",
  tenantName: "w-[14%]",
  roomNo: "w-[9%]",
  contractType: "w-[20%]",
  totalAmount: "w-[11%]",
  dueDate: "w-[11%]",
  status: "w-[11%]",
  billingIdForAction: "w-[8%]",
};

export const billingsTableColumns: ColumnDef<BillingTableData>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tenantId",
    header: "TenantId",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tenantName",
    header: "Tenant Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "roomNo",
    header: "Room No",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "contractType",
    header: "Contract Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as BillingStatus;

      return <StatusCell status={status} />;
    },
  },
  {
    accessorKey: "dueDate",
    header: "DueDate",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "billingForAction",
    header: "Actions",
    cell: (info) => {
      return <BillingDetailsModal billing={info.getValue() as Billing} />;
    },
  },
];

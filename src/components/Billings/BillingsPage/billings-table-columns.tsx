import { type ColumnDef } from "@tanstack/react-table";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";
import StatusCell from "@/components/Invoices/InovoiceTableCells/status-cell.tsx";
import type { Billing } from "@/types/billing/billingType.ts";

export const billingTableColumnWidths: Record<string, string> = {
  no: "w-[6%]",
  tenantId: "w-[11%]",
  tenantName: "w-[20%]",
  roomNo: "w-[9%]",
  contractType: "w-[13%]",
  totalAmount: "w-[11%]",
  dueDate: "w-[11%]",
  status: "w-[11%]",
  billingIdForAction: "w-[8%]",
};

export const getBillingTableColumns = (
  currentPage: number,
  limit: number,
): ColumnDef<Billing>[] => [
  {
    id: "no",
    header: "No.",
    cell: (info) => `${(currentPage - 1) * limit + info.row.index + 1}.`,
  },
  {
    id: "tenantId",
    header: "Tenant ID",
    accessorFn: (row) => row.room.tenant.id.split("-")[0],
  },
  {
    id: "tenantName",
    header: "Tenant Name",
    accessorFn: (row) => row.room.tenant.name,
  },
  {
    id: "roomNo",
    header: "Room No",
    accessorFn: (row) => row.room.roomNo,
  },
  {
    id: "contractType",
    header: "Contract Type",
    accessorFn: (row) =>
      row.room.contract.length
        ? row.room.contract[0].contractType.name
        : "24 Months",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) => row.invoice?.status,
    cell: (info) => {
      const status = info.getValue() as BillingStatus;
      return <StatusCell status={status} />;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: (info) => {
      const dueDate = info.getValue() as Date;
      return new Date(dueDate).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => <BillingDetailsModal billing={info.row.original} />,
  },
];

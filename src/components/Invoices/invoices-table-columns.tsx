import { type ColumnDef } from "@tanstack/react-table";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";

import type {
  InvoicesTableActionsData,
  InvoicesTableData,
} from "@/types/invoices/invoicesTableData.ts";
import ActionsCell from "@/components/Invoices/InovoiceTableCells/action-cell.tsx";
import StatusCell from "@/components/Invoices/InovoiceTableCells/status-cell.tsx";

export const invoicesTableColumnWidths: Record<string, string> = {
  no: "w-[5%]",
  invoiceNo: "w-[10%]",
  tenantName: "w-[13%]",
  roomNo: "w-[8%]",
  totalAmount: "w-[10%]",
  issueDate: "w-[10%]",
  dueDate: "w-[10%]",
  status: "w-[10%]",
  actions: "w-[15%] max-w-[150px]",
};

export const invoicesTableColumns: ColumnDef<InvoicesTableData>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: (info) => `${info.getValue()}.`,
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice No",
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
    accessorKey: "issueDate",
    header: "IssueDate",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "dueDate",
    header: "DueDate",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => {
      const actions = info.getValue() as InvoicesTableActionsData;
      return <ActionsCell actions={actions} />;
    },
  },
];

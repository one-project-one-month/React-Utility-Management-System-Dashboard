import { type ColumnDef } from "@tanstack/react-table";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";

import type { InvoicesTableActionsData } from "@/types/invoices/invoicesTableData.ts";
import ActionsCell from "@/components/Invoices/InovoiceTableCells/action-cell.tsx";
import StatusCell from "@/components/Invoices/InovoiceTableCells/status-cell.tsx";
import type { Billing } from "@/types/billing/billingType.ts";

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

export const invoicesTableColumns: ColumnDef<Billing>[] = [
  {
    id: "no",
    header: "No.",
    cell: (info) => `${info.row.index + 1}.`,
  },
  {
    id: "invoiceNo",
    header: "Invoice No",
    accessorFn: (row) => row.invoice.invoiceNo,
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
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: (info) => info.getValue(),
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
    accessorKey: "createdAt",
    id: "issueDate",
    header: "IssueDate",
    cell: (info) => {
      const issueDate = info.getValue() as Date;
      return new Date(issueDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "dueDate",
    id: "dueDate",
    header: "DueDate",
    cell: (info) => {
      const dueDate = info.getValue() as Date;
      return new Date(dueDate).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    accessorFn: (row) => {
      const billing = row;
      return {
        billing,
        tenant: billing.room.tenant,
        invoice: billing.invoice,
      };
    },
    cell: (info) => {
      const actionData = info.getValue() as InvoicesTableActionsData;
      return <ActionsCell actionData={actionData} />;
    },
  },
];

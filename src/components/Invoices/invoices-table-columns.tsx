import { type ColumnDef } from "@tanstack/react-table";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";
import { Chip } from "@heroui/react";

import type {
  InvoicesTableActions,
  InvoicesTableData,
} from "@/types/invoices/invoicesTableData.ts";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Download, Send } from "lucide-react";

export const invoicesTableColumnWidths: Record<string, string> = {
  no: "w-[5%]",
  invoiceNo: "w-[10%]",
  tenantName: "w-[15%]",
  roomNo: "w-[8%]",
  totalAmount: "w-[10%]",
  issueDate: "w-[12%]",
  dueDate: "w-[10%]",
  status: "w-[10%]",
  actions: "w-[10%]",
};
export const invoicesTableColumns: ColumnDef<InvoicesTableData>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: (info) => info.getValue(),
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

      let color: "default" | "success" | "warning" | "danger" = "default";

      switch (status) {
        case "Pending":
          color = "warning";
          break;
        case "Paid":
          color = "success";
          break;
        case "Overdue":
          color = "danger";
          break;
        default:
          color = "default";
      }

      return (
        <Chip
          color={color}
          variant="flat"
          radius="sm"
          className="capitalize font-medium"
        >
          {status}
        </Chip>
      );
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
      const actions = info.getValue() as InvoicesTableActions;
      return (
        <div className="flex justify-center gap-2">
          <Tooltip content="Download invoice" placement="top">
            <Button
              isIconOnly
              variant="light"
              color="primary"
              radius="full"
              onPress={() => {}}
            >
              <Download size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Send Receipt" placement="top">
            <Button
              isIconOnly
              isDisabled={actions.disableSendReceipt}
              variant="light"
              color="primary"
              radius="full"
              onPress={() => {}}
            >
              <Send size={18} />
            </Button>
          </Tooltip>
        </div>
      );
    },
  },
];

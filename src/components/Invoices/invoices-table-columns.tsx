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
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/components/Invoices/InvoicePDF/invoice-pdf.tsx";
import type { Invoice } from "@/types/invoices/invoiceType.ts";

export const invoicesTableColumnWidths: Record<string, string> = {
  no: "w-[5%]",
  invoiceNo: "w-[10%]",
  tenantName: "w-[12%]",
  roomNo: "w-[8%]",
  totalAmount: "w-[10%]",
  issueDate: "w-[10%]",
  dueDate: "w-[10%]",
  status: "w-[10%]",
  actions: "w-[15%]",
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
          radius="lg"
          classNames={{
            base: `min-w-20 h-6 px-2 `,
            content: `text-xs capitalize text-center font-semibold`,
          }}
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
          <BillingDetailsModal billingId={actions.billing.id} />
          <PDFDownloadLink
            document={
              <InvoicePDF
                billing={actions.billing}
                invoice={actions.invoice as Invoice}
                tenant={actions.tenant}
              />
            }
            fileName={`${actions.invoice?.invoiceNo}.pdf`}
          >
            <Tooltip content="Download Invoice" placement="top">
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
          </PDFDownloadLink>

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

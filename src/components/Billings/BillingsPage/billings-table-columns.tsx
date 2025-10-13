import { type ColumnDef } from "@tanstack/react-table";
import type {
  BillingStatus,
  BillingTableData,
} from "@/types/billing/billingTableData.ts";
import { Chip } from "@heroui/react";
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";

export const billingTableColumnWidths: Record<string, string> = {
  no: "w-[6%]",
  tenantId: "w-[9%]",
  tenantName: "w-[14%]",
  roomNo: "w-[9%]",
  contractType: "w-[21%]",
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
    accessorKey: "dueDate",
    header: "DueDate",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "billingIdForAction",
    header: "Actions",
    cell: (info) => {
      return <BillingDetailsModal billingId={info.getValue() as string} />;
    },
  },
];

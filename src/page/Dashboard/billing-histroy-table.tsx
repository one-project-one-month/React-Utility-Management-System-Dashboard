import TablePresentation from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";
import { Chip } from "@heroui/chip";
import { Eye } from "lucide-react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { useFetchBillings } from "@/hooks/billings/useBillings.ts";
import type { Billing } from "@/types/billing/billingType.ts";

// type Billing = {
//   name: string;
//   room: string;
//   date: string;
//   status: "Pending" | "Paid" | "Overdue";
// };

// const billingHistory: Billing[] = [
//      { name: "Robert Fox", room: "005", date: "6.10.2025", status: "Pending" },
//      { name: "Guy Hawkins", room: "005", date: "6.10.2025", status: "Paid" },
//      { name: "Jacob Jones", room: "005", date: "6.10.2025", status: "Overdue" },
// ];

const columns: ColumnDef<Billing>[] = [
  { id: "name", header: "Name", accessorFn: (row) => row.room.tenant.name },
  { id: "room", header: "Room No", accessorFn: (row) => row.room.roomNo },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: (info) => {
      return new Date(info.getValue() as string).toLocaleDateString();
    },
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) => row.invoice.status,
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
          radius="full"
          classNames={{
            base: "min-w-20 h-6 px-2 transition hover:scale-120 hover:cursor-default",
            content: "text-xs capitalize text-center font-semibold",
          }} >
          {status}
        </Chip>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Tooltip content="See History" placement="top" className="mb-1">
        <Button
          isIconOnly
          variant="light"
          color="primary"
          radius="full"
          onPress={() => handleOpen(row.original)}
          className="transition hover:scale-120"
        >
          <Eye size={18} />
        </Button>
      </Tooltip>
    ),
  },
];

export default function BillingTable() {
  const pagination = {
    page: 1,
    limit: 3,
  };
  const { data: content, isLoading } = useFetchBillings(pagination);
  const billings = content?.data ?? [];
  return (
    <TablePresentation
      columns={columns}
      isLoading={isLoading}
      data={billings}
      isManualPagination={false}
    />
  );
}

function handleOpen(billing: Billing) {
  console.log("Open billing for:", billing.room.tenant.name);
  // Your modal logic can go here
}

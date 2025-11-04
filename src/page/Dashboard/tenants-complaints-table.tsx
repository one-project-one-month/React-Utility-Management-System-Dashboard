import TableData from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Eye } from "lucide-react";
import { useCustomerService } from "@/hooks/useCustomerService.ts";
import type { CustomerService } from "@/types/customer-service.ts";

// type Complaint = {
//      name: string;
//      room: string;
//      date: string;
// };

// const tenantsComplaints: CustomerService[] = [
//      { name: "Robert Fox", room: "005", date: "6.10.2025" },
//      { name: "Guy Hawkins", room: "008", date: "6.10.2025" },
//      { name: "Jacob Jones", room: "008", date: "6.10.2025" },
//      { name: "Devon Lane", room: "008", date: "6.10.2025" },
//      { name: "Kristin Watson", room: "008", date: "6.10.2025" },
//      { name: "Cody Fisher", room: "008", date: "6.10.2025" },
//      { name: "Thaw Lewis", room: "000", date: "13.5.2005" },
//      { name: "Wunna Aung", room: "001", date: "6.10.2025" },
// ];

const columns: ColumnDef<CustomerService>[] = [
  { accessorKey: "roomNo", header: "Room No" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "issuedDate",
    header: "Date",
    cell: (info) => {
      const date = info.getValue();
      return new Date(date as Date).toLocaleDateString();
    },
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Tooltip content="See Complaint" placement="top" className="mb-1">
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

export default function ComplaintsTable() {
  const { data, isLoading } = useCustomerService(1, 7);
  const complaints = data?.content.data ?? [];
  return (
    <TableData
      columns={columns}
      data={complaints}
      isLoading={isLoading}
      isManualPagination={false}
    />
  );
}

// Optional: handle click logic
function handleOpen(complaints: CustomerService) {
  console.log("Open complaint from:Room No", complaints.roomNo);
  // Your modal logic can go here
}

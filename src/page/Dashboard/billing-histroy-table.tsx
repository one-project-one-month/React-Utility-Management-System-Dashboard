import TableData from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type Billing = {
     name: string;
     room: string;
     date: string;
     status: "Pending" | "Paid" | "Overdue";
};

const billingHistory: Billing[] = [
     { name: "Robert Fox", room: "005", date: "6.10.2025", status: "Pending" },
     { name: "Guy Hawkins", room: "005", date: "6.10.2025", status: "Paid" },
     { name: "Jacob Jones", room: "005", date: "6.10.2025", status: "Overdue" },
];

const columns: ColumnDef<Billing>[] = [
     { accessorKey: "name", header: "Name" },
     { accessorKey: "room", header: "Room No" },
     { accessorKey: "due", header: "Due Date" },
     { accessorKey: "status", header: "Status" },
];

export default function BillingTable() {
     return (
          <TableData
               columns={columns}
               data={billingHistory}
               isManualPagination={false}
          />
     );
}

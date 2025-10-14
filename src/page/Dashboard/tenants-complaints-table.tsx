import TableData from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type Complaint = {
     name: string;
     room: string;
     date: string;
};

const tenantsComplaints: Complaint[] = [
     { name: "Robert Fox", room: "005", date: "6.10.2025" },
     { name: "Guy Hawkins", room: "008", date: "6.10.2025" },
     { name: "Jacob Jones", room: "008", date: "6.10.2025" },
     { name: "Devon Lane", room: "008", date: "6.10.2025" },
     { name: "Kristin Watson", room: "008", date: "6.10.2025" },
     { name: "Cody Fisher", room: "008", date: "6.10.2025" },
];

const columns: ColumnDef<Complaint>[] = [
     { accessorKey: "name", header: "Name" },
     { accessorKey: "room", header: "Room No" },
     { accessorKey: "date", header: "Date" },
];

export default function ComplaintsTable() {
     return (
          <TableData
               columns={columns}
               data={tenantsComplaints}
               isManualPagination={false}
          />
     );
}

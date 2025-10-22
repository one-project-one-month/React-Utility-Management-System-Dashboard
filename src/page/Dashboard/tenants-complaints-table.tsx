import TableData from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { FileText } from "lucide-react";

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
     { name: "Thaw Lewis", room: "000", date: "13.5.2005" },
     { name: "Wunna Aung", room: "001", date: "6.10.2025" },
];

const columns: ColumnDef<Complaint>[] = [
     { accessorKey: "name", header: "Name" },
     { accessorKey: "room", header: "Room No" },
     { accessorKey: "date", header: "Date" },
     {
          header: "Action",
          cell: ({ row }) => (
               <Tooltip
                    content="See Complaint"
                    placement="top"
                    className="mb-1"
               >
                    <Button
                         isIconOnly
                         variant="light"
                         color="primary"
                         radius="full"
                         onPress={() => handleOpen(row.original)}
                         className="transition hover:scale-120"
                    >
                         <FileText size={18} />
                    </Button>
               </Tooltip>
          ),
     },
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

// Optional: handle click logic
function handleOpen(complaints: Complaint) {
     console.log("Open billing for:", complaints.name);
     // Your modal logic can go here
}

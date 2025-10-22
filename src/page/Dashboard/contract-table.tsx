import TablePresentation from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { FileText } from "lucide-react";

type Contracts = {
     name: string;
     room: string;
     date: string;
};

const dataContracts: Contracts[] = [
     { name: "Robert Fox", room: "005", date: "31.11.2025" },
     { name: "Guy Hawkins", room: "008", date: "16.12.2025" },
     { name: "Jenny Wilson", room: "008", date: "16.12.2025" },
];

const columns: ColumnDef<Contracts>[] = [
     { accessorKey: "name", header: "Name" },
     { accessorKey: "room", header: "Room No" },
     { accessorKey: "date", header: "Expiry Date" },
     {
          header: "Action",
          cell: ({ row }) => (
               <Tooltip content="See Contract" placement="top" className="mb-1">
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

export default function ContractsTable() {
     return (
          <TablePresentation
               columns={columns}
               data={dataContracts}
               isManualPagination={false}
          />
     );
}

// Optional: handle click logic
function handleOpen(contract: Contracts) {
     console.log("Open billing for:", contract.name);
     // Your modal logic can go here
}

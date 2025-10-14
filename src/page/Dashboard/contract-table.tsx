import TableData from "@/components/data-table";
import { type ColumnDef } from "@tanstack/react-table";

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
];

export default function ContractsTable() {
     return (
          <TableData
               columns={columns}
               data={dataContracts}
               isManualPagination={false}
          />
     );
}

import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../data-table";
import { Chip } from "@heroui/react";

type User = { id: number; name: string; email: string };

const columns: ColumnDef<User>[] = [
     {
          accessorKey: "id",
          header: "ID",
     },
     {
          accessorKey: "name",
          header: "Name",
     },
     {
          accessorKey: "email",
          header: "Email",
     },
     {
          id: "status",
          header: "Status",
          cell: ({ row }) => {
               const status = row.original.id % 2 === 0 ? "Active" : "Inactive";
               const color = status === "Active" ? "success" : "danger";
               return <Chip color={color}>{status}</Chip>;
          },
     },
];

const data: User[] = [
     { id: 1, name: "Alice", email: "alice@example.com" },
     { id: 2, name: "Bob", email: "bob@example.com" },
];

const DataTableExample = () => {
     return (
          <div>
               <DataTable
                    columns={columns}
                    data={data}
                    isManualPagination={false}
               />
          </div>
     );
};

export default DataTableExample;

import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";

import type { Contracts } from "@/types/contract";
import { contractTypes } from "@/constants/contractMockData";

const columns: ColumnDef<Contracts>[] = [
    {
        accessorKey: "id",
        header: "No",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
        accessorKey: "facilities",
        header: "Facilities",
    }
];

export default function ContractTable() {
    return (
        <>
            <DataTable columns={columns} data={contractTypes} isManualPagination={false} />
        </>
    )

}
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";

import type { Contracts } from "@/types/contract";

const columns: ColumnDef<Contracts>[] = [
    {
        accessorKey: "id",
        header: "ID",
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

const data: Contracts[] = [
    { id: 1, name: "Standard Plan", duration: "6 months", price: "100", facilities: ["Water Cooler", "Air Conditioner"] },
    { id: 2, name: "Premium Plan", duration: "1 year", price: "180", facilities: ["TV", "Gas"] },
    { id: 3, name: "Basic Plan", duration: "3 months", price: "60", facilities: ["Washing Machine"] },
    { id: 4, name: "Family Plan", duration: "2 years", price: "300", facilities: ["Wi-fi", "Gas"] },
    { id: 5, name: "Single Plan", duration: "1 year", price: "120", facilities: ["Refrigerator"] },
];
export default function ContractTable() {
    return (
        <>
            <DataTable columns={columns} data={data} isManualPagination={false} />
        </>
    )

}
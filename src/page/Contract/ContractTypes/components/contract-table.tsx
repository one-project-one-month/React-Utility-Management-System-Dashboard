import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";

import type { Contracts } from "@/types/contract";
import { useFetchContractTypes } from "@/hooks/useContract";
import { Spinner } from "@heroui/react";
import FacilityChip from "./facility-chip";

const renderFacilities = (facilities: string[]) => {
    return (
        <div className="flex flex-wrap gap-2">
            {facilities.map((f) => (
                <FacilityChip key={f} facility={f} />
            ))}
        </div>
    );
};

const columns: ColumnDef<Contracts>[] = [
    {
        id: "no",
        header: "No",
        enableResizing: false,
        size: 1,
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) => `${Number(getValue()).toLocaleString()} Ks`,
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => {
            const duration = row.original.duration; // e.g., 3, 6, 12, 24

            if (duration >= 12) {
                const years = duration / 12;
                return `${years} Year${years > 1 ? "s" : ""}`;
            } else {
                return `${duration} Month${duration > 1 ? "s" : ""}`;
            }
        }
    },
    {
        accessorKey: "facilities",
        header: "Facilities",
        cell: ({ row }) => renderFacilities(row.original.facilities ?? []),
    }
];

export default function ContractTable() {
    const { data: contractTypes, isLoading, isSuccess, isRefetching } = useFetchContractTypes()

    return (
        <>
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <Spinner
                        classNames={{ label: "text-white mt-4 mx-auto" }}
                        label="Loading..."
                        variant="simple"
                        color="primary"
                        size="sm"
                    />
                </div>
            )}

            {isSuccess && <DataTable
                columns={columns}
                data={contractTypes?.data ?? []}
                isManualPagination={false}
                isLoading={isRefetching}
            />}
        </>
    )

}

import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";

import type { TenantContracts } from "@/types/contract";
import { tenantContracts } from "@/constants/contractMockData";
import { Button, Tooltip, Divider } from "@heroui/react";
import { FileText } from "lucide-react";
import NavigationBreadCrumbs from "@/components/breadcrumb";

const columns: ColumnDef<TenantContracts>[] = [
    {
        accessorKey: "id",
        header: "No",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "contractType",
        header: "Contract Type",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "occupants",
        header: "Occupants",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: () => {
            return <Tooltip content="See Billing Details" placement="top">
                <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    radius="full"
                //   onPress={onOpen}
                >
                    <FileText size={18} />
                </Button>
            </Tooltip>;
        }
    }
];

export default function ContractListPage() {
    return (<div>
        <NavigationBreadCrumbs
            items={[
                { label: "Contract", href: null },
                { label: "Contract History", href: "/contract-history" },
            ]}
        />
        <h2 className="sm:text-2xl mt-2">Contract List Page</h2>
        <Divider className="my-3" />
        <DataTable columns={columns} data={tenantContracts} isManualPagination={false} />
    </div>)
}
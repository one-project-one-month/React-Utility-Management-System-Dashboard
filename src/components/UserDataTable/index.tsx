import type {ColumnDef} from "@tanstack/react-table";
import type {UserList} from "@/types/user.ts";
import {roleColors, roleLabels} from "@/constants/userMockData.ts";
import DataTable from "@/components/data-table.tsx";
import {Chip, Tooltip} from "@heroui/react";
import {Eye, Pencil, Trash2} from "lucide-react";
import {useMemo, useState} from "react";

const columns: ColumnDef<UserList>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "userName",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role as keyof typeof roleColors;

            return (
                <Chip className={roleColors[role]} radius={"md"}>
                    {roleLabels[role]}
                </Chip>
            )
        }
    },
    {
        accessorKey: "phNumber",
        header: "Phone No",
    },
    {
        accessorKey: "emergencyNo",
        header: "Emergency No",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;

            const handleView = () => {
                window.location.href = `/user-management/users/${user.id}`;
            }

            const handleEdit = () => {
                window.location.href = `/user-management/users/${user.id}/edit`;
            }

            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                        <span
                            onClick={handleView}
                            className="py-2 px-3 border-[0.5px] border-gray-300 dark:border-gray-600 rounded-lg text-sm text-default-400 cursor-pointer active:opacity-50"
                        >
                            <Eye className={"w-4 h-4"} />
                        </span>
                    </Tooltip>
                    <Tooltip content="Edit user">
                        <span
                            onClick={handleEdit}
                            className="py-2 px-3 border-[0.5px] border-gray-300 dark:border-gray-600 rounded-lg text-sm text-default-400 cursor-pointer active:opacity-40"
                        >
                            <Pencil className={"w-4 h-4"} />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <span className="py-2 px-3 border-[0.5px] border-gray-300 dark:border-gray-600 rounded-lg text-sm text-danger cursor-pointer active:opacity-40">
                            <Trash2 className={"w-4 h-4"} />
                        </span>
                    </Tooltip>
                </div>
            )
        }
    }
];

interface UserDataTableProps {
    data: UserList[];
    isLoading?: boolean;
}

export function UserDataTable({ data, isLoading = false }: UserDataTableProps) {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        setTotalElements(data.length);
        return data.slice(start, start + pageSize);
    }, [data, page, pageSize]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    return (
        <div>
            <DataTable
                columns={columns}
                data={paginatedData}
                isManualPagination
                isLoading={isLoading}
                page={page}
                pageSize={pageSize}
                totalElements={totalElements}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
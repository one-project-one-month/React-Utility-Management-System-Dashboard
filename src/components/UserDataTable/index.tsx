import type {ColumnDef} from "@tanstack/react-table";
import type {UserList} from "@/types/user.ts";
import {roleColors, roleLabels} from "@/constants/userMockData.ts";
import DataTable from "@/components/data-table.tsx";
import {Button, Chip, Tooltip} from "@heroui/react";
import {Eye, Pencil, Trash2} from "lucide-react";
import {useMemo, useState} from "react";
import {useConfirmDialog} from "@/hooks/useConfirmDialog.tsx";
import { useNavigate } from "react-router";

interface UserDataTableProps {
    data: UserList[];
    isLoading?: boolean;
    onDeleteUser?: (userId: string) => void;
}

export function UserDataTable({ data, isLoading = false, onDeleteUser }: UserDataTableProps) {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const { showConfirm, ConfirmDialog } = useConfirmDialog();

    const navigate = useNavigate()

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        setTotalElements(data.length);
        return data.slice(start, start + pageSize);
    }, [data, page, pageSize]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    const columns: ColumnDef<UserList>[] = useMemo(() => [
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

                const handleDelete = () => {
                    showConfirm({
                        title: "Delete User",
                        message: `Are you sure you want to delete ${user.userName}? This action cannot be undone.`,
                        confirmText: "Delete",
                        cancelText: "Cancel",
                        confirmColor: "danger",
                        onConfirm: () => {
                            if (onDeleteUser) {
                                onDeleteUser(user.id);
                            }
                        }
                    })
                }

                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <Button
                                onPress={() => navigate(`/user-management/users/${user.id}`)}
                                isIconOnly
                                variant="light"
                                color="default"
                            >
                                <Eye size={18} className={"text-default-500"} />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <Button
                                onPress={() => navigate(`/user-management/users/${user.id}/edit`)}
                                isIconOnly
                                variant="light"
                                color="primary"
                            >
                                <Pencil size={18} className={"text-primary"} />
                            </Button>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <Button
                                onPress={handleDelete}
                                isIconOnly
                                variant="light"
                                color="danger"
                            >
                                <Trash2 size={18} className={"text-danger"} />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        }
    ], [showConfirm]);

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
            <ConfirmDialog />
        </div>
    )
}
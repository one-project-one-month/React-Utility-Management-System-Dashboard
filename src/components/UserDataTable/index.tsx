import type {ColumnDef} from "@tanstack/react-table";
import {roleColors, roleLabels} from "@/constants/userMockData.ts";
import {Button, Chip, Tooltip} from "@heroui/react";
import {Eye, Pencil, Trash2} from "lucide-react";
import { useNavigate } from "react-router";
import TablePresentation from "../data-table";
import type {User} from "@/types/user.ts";

interface UserDataTableProps {
    data: User[];
    isLoading?: boolean;
    onDeleteUser?: (userId: string) => void;
    isDeletingUser?: boolean;
    showConfirm?: (options: any) => void;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export function UserDataTable({
    data,
    isLoading = false,
    onDeleteUser,
    isDeletingUser = false,
    showConfirm,
    currentPage,
    pageSize,
    totalPages,
    onPageChange
}: UserDataTableProps) {
    const navigate = useNavigate()

    const columns: ColumnDef<User>[] = [
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
                    <Chip
                        className={roleColors[role]}
                        classNames={{
                            base: roleColors[role],
                            content: "!font-semibold text-xs"
                        }}
                        radius={"lg"}
                    >
                        {roleLabels[role]}
                    </Chip>
                )
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original;

                const handleDelete = () => {
                    if (showConfirm && onDeleteUser) {
                        showConfirm({
                            title: "Delete User",
                            message: `Are you sure you want to delete ${user.userName}? This action cannot be undone.`,
                            confirmText: "Delete",
                            cancelText: "Cancel",
                            confirmColor: "danger",
                            isLoading: isDeletingUser,
                            onConfirm: () => {
                                onDeleteUser(user.id ?? '');
                            }
                        });
                    }
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
    ];

    return (
        <div>
            <TablePresentation
                columns={columns}
                data={data}
                isManualPagination
                isLoading={isLoading}
                page={currentPage}
                pageSize={pageSize}
                totalElements={totalPages * pageSize}
                onPageChange={onPageChange}
            />
        </div>
    )
}
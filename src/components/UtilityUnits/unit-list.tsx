import type { UtilityUnit } from "@/types/utilityUnit";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import DataTable from "../data-table";
import { Link } from "react-router";
import { EyeIcon } from "lucide-react";
import useFetchUtilityUnit from "@/hooks/useFetchUtilityUnit";
import type { Pagination } from "@/types/pagination";
import { Chip } from "@heroui/react";

export default function UnitList() {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
  });

  const { data: utilityUnit, isPending } = useFetchUtilityUnit(pagination);
  const statusColors = {
    Available: "bg-emerald-600 text-xs text-white px-2 py-1",
    Rented: "bg-blue-600 text-xs text-white px-2 py-1",
    Purchased: "bg-violet-600 text-xs text-white px-2 py-1",
    InMaintenance: "bg-yellow-600 text-xs text-white px-2 py-1",
  };

  const columns: ColumnDef<UtilityUnit>[] = [
    {
      id: "roomInfo",
      header: "Room ",
      cell: ({ row }) => {
        const { roomNo, floor, roomStatus } = row.original;
        return (
          <div className="flex flex-col gap-3">
            <p className="space-x-2">
              <span>No - {roomNo}</span>{" "}
              <span className="text-xs text-gray-500">Floor - {floor}</span>
            </p>
            <div className="flex items-center gap-x-3">
              <p className="text-xs">
                <Chip
                  size={"sm"}
                  variant="flat"
                  className={statusColors[roomStatus]}
                  radius={"full"}
                >
                  {roomStatus}
                </Chip>{" "}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "tenantName",
      header: "Tenant Name",
    },
    {
      accessorKey: "electricityUnits",
      header: "Electricity Unit",
      cell: ({ row }) => {
        return (
          <div className="space-x-1">
            <span>{row.original.electricityUnits}</span>
            <span className="text-xs text-gray-400"> kwh </span>
          </div>
        );
      },
    
    },
    {
      accessorKey: "waterUnits",
      header: "Water Unit",
      cell: ({ row }) => {
        return (
          <div className="space-x-1">
            <span>{row.original.waterUnits}</span>
            <span className="text-xs text-gray-400">m³</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) => {
        const dateValue = getValue() as Date;

        const date = new Date(dateValue).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = new Date(dateValue).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return `${date}, ${time}`;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ getValue }) => {
        const dateValue = getValue() as Date;
        const date = new Date(dateValue).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = new Date(dateValue).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return `${date}, ${time}`;
      },
    },
    {
      id: "action",
      header: () => <div className="text-center">Action</div>,
      cell: (info) => {
        return (
          <div className="flex justify-center gap-x-1">
            <Link
              to={`/utility-units/${info.row.original.id}`}
              className="px-3 py-2 border rounded border-neutral-200"
            >
              <EyeIcon size={12} />
            </Link>
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page: page }));
  };

  return (
    <div className="mt-10">
      <DataTable
        columns={columns}
        data={utilityUnit?.content.data ?? []}
        isManualPagination={true}
        isLoading={isPending}
        page={pagination.page}
        pageSize={pagination.limit}
        totalElements={utilityUnit?.content.meta?.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

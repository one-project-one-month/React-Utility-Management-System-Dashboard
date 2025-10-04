import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { tenantTableColumns } from "@/components/Tenants/TenantTable/tenantTableColumns";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import clsx from "clsx";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { useNavigate } from "react-router";
import type { TenantType } from "@/types/tenants/tenantType.ts";

export default function TenantsTable() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/tenants/update/1");
  };

  const handleDetails = () => {
    console.log("Details button clicked");
  };

  const columns = tenantTableColumns({
    onEdit: handleEdit,
    onDetails: handleDetails,
  });

  const table = useReactTable({
    data: mockTenants,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const columnWidths: Record<string, string> = {
    no: "w-[5%]",
    name: "w-[10%]",
    email: "w-[15%]",
    phoneNo: "w-[15%]",
    emergencyNo: "w-[15%]",
    nrc: "w-[20%]",
    roomNo: "w-[10%]",
    residentsCount: "w-[10%]",

    actions: "w-[13%]",
  };

  return (
    <div className="overflow-x-auto min-w-[70vw] mx-auto rounded-xl border border-gray-300 shadow-sm">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    "border border-gray-300 px-1 py-2 text-sm font-semibold text-gray-700 text-center",
                    columnWidths[header.column.id] || "w-auto",
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={clsx(
                "hover:bg-gray-50 transition-colors",
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50",
              )}
            >
              {row.getVisibleCells().map((cell) => {
                const tenant = row.original as TenantType;

                const room =
                  cell.column.id === "roomNo" && "roomId" in row.original
                    ? mockRooms.find((room) => room.id === tenant.roomId)
                    : null;
                return (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-1 py-2 text-sm text-gray-700 text-center break-words"
                  >
                    {cell.column.id === "no"
                      ? row.index + 1
                      : cell.column.id === "residentsCount"
                        ? (row.original?.name?.length ?? 0)
                        : cell.column.id === "name"
                          ? (row.original?.name[0] ?? "")
                          : cell.column.id === "roomNo"
                            ? room?.roomNo
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

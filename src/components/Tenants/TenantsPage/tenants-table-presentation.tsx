import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { SkeletonLoader } from "@/components/skeleton-loader.tsx";
import clsx from "clsx";
import { columnWidths } from "@/components/Tenants/TenantsPage/tenants-table-columns.tsx";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isManualPagination: boolean;
  isLoading?: boolean;
  page?: number;
  pageSize?: number;
  totalElements?: number;
  onPageChange?: (newPage: number) => void;
};

const TenantsTablePresentation = <TData, TValue>({
  columns,
  data,
  isManualPagination,
  isLoading = false,
  page = 1,
  pageSize = 10,
  totalElements = 0,
  onPageChange,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: isManualPagination,
    pageCount: isManualPagination
      ? Math.ceil(totalElements / pageSize)
      : undefined,
    state: isManualPagination
      ? { pagination: { pageIndex: page - 1, pageSize } }
      : undefined,
  });

  const totalPages = isManualPagination
    ? Math.max(1, Math.ceil(totalElements / pageSize))
    : table.getPageCount() || 1;

  const numColumns = table
    .getHeaderGroups()
    .flatMap((headerGroup) => headerGroup.headers).length;

  const skeletonRows = Array.from({ length: pageSize }, (_, i) => i);

  return (
    <Table
      isStriped={!isLoading}
      aria-label="Dynamic Data Table With Tanstack Table"
      classNames={{
        base: "w-full",
        table: "w-full  table-fixed ",
      }}
      bottomContent={
        isManualPagination && (
          <Pagination
            isCompact
            showControls
            showShadow
            className="flex w-full justify-end"
            color="primary"
            page={
              isManualPagination
                ? page
                : table.getState().pagination?.pageIndex + 1
            }
            total={totalPages}
            onChange={(newPage) => {
              if (onPageChange) {
                onPageChange(newPage);
              }
              // table.setPageIndex(newPage - 1)
            }}
          />
        )
      }
    >
      <TableHeader
        columns={table
          .getHeaderGroups()
          .flatMap((headerGroup) => headerGroup.headers)}
      >
        {(header) => {
          return (
            <TableColumn
              key={header.id}
              className={clsx(
                columnWidths[header.column.id] || "w-auto",
                header.column.id === "actions" && "text-center",
              )}
            >
              <div className="whitespace-normal break-words max-w-[200px]">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </div>
            </TableColumn>
          );
        }}
      </TableHeader>

      <TableBody
        items={table.getRowModel().rows}
        emptyContent={isLoading ? undefined : "No data to display"}
      >
        {isLoading
          ? skeletonRows.map((rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                {Array.from({ length: numColumns }).map((_, colIdx) => (
                  <TableCell key={`skeleton-cell-${rowIdx}-${colIdx}`}>
                    <SkeletonLoader className="h-4 w-full rounded-lg" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : (row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={clsx(
                      columnWidths[cell.column.id] || "w-auto",
                      cell.column.id === "actions" && "text-center",
                    )}
                  >
                    <div className="whitespace-normal break-words max-w-[200px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            )}
      </TableBody>
    </Table>
  );
};

export default TenantsTablePresentation;

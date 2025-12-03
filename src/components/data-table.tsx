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

type DataTableProps<TData, TValue> = {
   columns: ColumnDef<TData, TValue>[];
   columnWidths?: Record<string, string>;
   data: TData[];
   isManualPagination: boolean;
   isLoading?: boolean;
   page?: number;
   pageSize?: number;
   totalElements?: number;
   onPageChange?: (newPage: number) => void;
};

const TablePresentation = <TData, TValue>({
   columns,
   columnWidths,
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
      .flatMap(headerGroup => headerGroup.headers).length;

   const skeletonRows = Array.from({ length: pageSize }, (_, i) => i);
   const estimatedRowHeight = 56; // adjust to match your row height (px)
   const bodyMinHeight = `${pageSize * estimatedRowHeight}px`;

   return (
      <Table
         isStriped={!isLoading}
         aria-label="Dynamic Data Table With Tanstack Table"
         classNames={{
            base: "w-full",
            table: "w-full  table-fixed ",
         }}
         style={{ minHeight: bodyMinHeight }}
         bottomContent={
            <div className="w-full flex justify-end" style={{ minHeight: 56 }}>
               {isManualPagination && (
                  <Pagination
                     isCompact
                     showControls
                     showShadow
                     className="flex"
                     color="primary"
                     page={
                        isManualPagination
                           ? page
                           : table.getState().pagination?.pageIndex + 1
                     }
                     total={totalPages}
                     onChange={newPage => {
                        if (onPageChange) onPageChange(newPage);
                     }}
                     isDisabled={isLoading}
                  />
               )}
            </div>
         }
      >
         <TableHeader
            columns={table
               .getHeaderGroups()
               .flatMap(headerGroup => headerGroup.headers)}
         >
            {header => {
               return (
                  <TableColumn
                     key={header.id}
                     className={clsx(
                        (columnWidths && columnWidths[header.column.id]) || "w-auto",
                        (header.column.id === "actions" ||
                           header.column.id === "billingIdForAction" ||
                           header.column.id === "status") &&
                           "text-center"
                     )}
                  >
                     <div className="whitespace-normal break-words max-w-[200px]">
                        {header.isPlaceholder
                           ? null
                           : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
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
               ? skeletonRows.map(rowIdx => (
                    <TableRow key={`skeleton-${rowIdx}`}>
                       {Array.from({ length: numColumns }).map((_, colIdx) => (
                          <TableCell key={`skeleton-cell-${rowIdx}-${colIdx}`}>
                             <SkeletonLoader className="h-6 py-3 w-full rounded-lg" />
                          </TableCell>
                       ))}
                    </TableRow>
                 ))
               : row => (
                    <TableRow key={row.id}>
                       {row.getVisibleCells().map(cell => (
                          <TableCell
                             key={cell.id}
                             className={clsx(
                                (columnWidths && columnWidths[cell.column.id]) ||
                                   "w-auto",
                                (cell.column.id === "actions" ||
                                   cell.column.id === "billingIdForAction" ||
                                   cell.column.id === "status") &&
                                   "text-center"
                             )}
                          >
                             <div className="whitespace-normal break-words max-w-[200px]">
                                {flexRender(
                                   cell.column.columnDef.cell,
                                   cell.getContext()
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

export default TablePresentation;

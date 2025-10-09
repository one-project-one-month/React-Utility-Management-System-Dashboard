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
import { SkeletonLoader } from "./skeleton-loader";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isManualPagination: boolean
    isLoading?: boolean
    page?: number
    pageSize?: number
    totalElements?: number
    onPageChange?: (newPage: number) => void
};

const DataTable = <TData, TValue>({
    columns,
    data,
    isManualPagination,
    isLoading = false,
    page = 1,
    pageSize = 10,
    totalElements = 0,
    onPageChange
}: DataTableProps<TData, TValue>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: isManualPagination,
        pageCount: isManualPagination ? Math.ceil(totalElements / pageSize) : undefined,
        state: isManualPagination
            ? { pagination: { pageIndex: page - 1, pageSize } }
            : undefined
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
            bottomContent={
                isManualPagination && (
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        className="flex w-full justify-end"
                        color="primary"
                        page={isManualPagination ? page : table.getState().pagination?.pageIndex + 1}
                        total={totalPages}
                        onChange={(newPage) => {
                            if(onPageChange) {
                                onPageChange(newPage)
                            }
                            // table.setPageIndex(newPage - 1)
                        }}
                    />
                )
            }
        >
            <TableHeader
                columns={
                    table.getHeaderGroups().flatMap((headerGroup) => headerGroup.headers)
                }
            >
                {(header) => (
                    <TableColumn key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={table.getRowModel().rows}
                emptyContent={isLoading ? undefined : "No data to display"}
            >
                {isLoading
                    ? skeletonRows.map((rowIdx) => (
                        <TableRow key={`skeleton-${rowIdx}`}>
                            {Array.from({ length: numColumns }).map(
                                (_, colIdx) => (
                                    <TableCell key={`skeleton-cell-${rowIdx}-${colIdx}`}>
                                        <SkeletonLoader className="h-4 w-full rounded-lg" />
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    ))
                    : (row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
            </TableBody>
        </Table>
    );
};

export default DataTable;

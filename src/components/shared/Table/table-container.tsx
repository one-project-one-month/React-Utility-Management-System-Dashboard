import { useEffect, useState } from "react";
import type { BillingTableData } from "@/types/billing/billingTableData.ts";
import type { TenantTableData } from "@/types/tenants/TenantTableData.ts";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table.tsx";
import type { InvoicesTableData } from "@/types/invoices/invoicesTableData.ts";

type TableData = BillingTableData[] | TenantTableData[] | InvoicesTableData[];
type TableContainerProps<T> = {
  isLoading: boolean;
  tableName: string;
  tableData: TableData;
  columns: ColumnDef<T>[];
  columnWidths: Record<string, string>;
};

type BillingTableProps = TableContainerProps<BillingTableData> & {
  tableName: "BillingTable";
  tableData: BillingTableData[];
};

type InvoicesTableProps = TableContainerProps<InvoicesTableData> & {
  tableName: "InvoicesTable";
  tableData: InvoicesTableData[];
};

type TenantTableProps = TableContainerProps<TenantTableData> & {
  tableName: "TenantTable";
  tableData: TenantTableData[];
};

type Props = BillingTableProps | TenantTableProps | InvoicesTableProps;

export default function TableContainer({
  isLoading,
  tableData,
  columns,
  columnWidths,
}: Props) {
  const [data, setData] = useState<TableData>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  // const billingTableData = useBillingToBillingTableData({
  //   page,
  //   pageSize,
  //   billings: items,
  // });
  //
  // const invoicesTableData = useInvoiceToInvoiceTableData({
  //   page,
  //   pageSize,
  //   invoices: items,
  // });

  // const tenantTableData = useTenantToTenantTableData({
  //   page,
  //   pageSize,
  //   tenants: items,
  // });

  // const tableData =
  //   tableName === "BillingTable"
  //     ? billingTableData
  //     : // : tableName === "TenantTable"
  //       // ? tenantTableData
  //       invoicesTableData;
  //
  // const columns = billingsTableColumns;

  console.log("tableData is", tableData);

  console.log("data is", data);

  useEffect(() => {
    // setIsLoading(true);

    const start = (page - 1) * pageSize;
    const paginatedData = tableData.slice(start, start + pageSize);
    setData(paginatedData);
    setTotalElements(tableData.length ?? 0);
    // setIsLoading(false);
  }, [page, pageSize, tableData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <DataTable<any, any>
      columns={columns}
      columnWidths={columnWidths}
      data={data}
      isManualPagination
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      totalElements={totalElements}
      onPageChange={handlePageChange}
    />
  );
}

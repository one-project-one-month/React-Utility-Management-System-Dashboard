import { useEffect, useState } from "react";
import type { BillingTableData } from "@/types/billing/billingTableData.ts";
import { mockBillings } from "@/constants/mockData/billing/mockBillings.ts";
import { useBillingToBillingTableData } from "@/hooks/useBillingToBillingTableData.ts";
import type { TenantTableData } from "@/types/tenants/TenantTableData.ts";
import type { ColumnDef } from "@tanstack/react-table";
import { useTenantToTenantTableData } from "@/hooks/useTenantToTenantTableData.ts";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import DataTable from "@/components/data-table.tsx";
import type { InvoicesTableData } from "@/types/invoices/invoicesTableData.ts";
import { useInvoiceToInvoiceTableData } from "@/hooks/useInvoiceToInvoiceTableData.ts";
import { mockInvoices } from "@/constants/mockData/billing/mockInvoices.ts";

type TableContainerProps<T> = {
  tableName: string;
  columns: ColumnDef<T>[];
  columnWidths: Record<string, string>;
};

type BillingTableProps = TableContainerProps<BillingTableData> & {
  tableName: "BillingTable";
};

type InvoicesTableProps = TableContainerProps<InvoicesTableData> & {
  tableName: "InvoicesTable";
};

type TenantTableProps = TableContainerProps<TenantTableData> & {
  tableName: "TenantTable";
};

type Props = BillingTableProps | TenantTableProps | InvoicesTableProps;
type TableData = BillingTableData[] | TenantTableData[] | InvoicesTableData[];
export default function TableContainer({
  tableName,
  columns,
  columnWidths,
}: Props) {
  const [data, setData] = useState<TableData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const billingTableData = useBillingToBillingTableData({
    page,
    pageSize,
    billings: mockBillings,
  });

  const invoicesTableData = useInvoiceToInvoiceTableData({
    page,
    pageSize,
    invoices: mockInvoices,
  });

  const tenantTableData = useTenantToTenantTableData({
    page,
    pageSize,
    tenants: mockTenants,
  });

  const tableData =
    tableName === "BillingTable"
      ? billingTableData
      : tableName === "TenantTable"
        ? tenantTableData
        : invoicesTableData;
  //
  // const columns = billingsTableColumns;

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      const start = (page - 1) * pageSize;
      const paginatedData = tableData.slice(start, start + pageSize);
      setData(paginatedData);
      setTotalElements(tableData.length);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [page, pageSize]);

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

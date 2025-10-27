import TenantsListHeader from "@/components/Tenants/TenantsPage/tenants-list-header.tsx";
import {
  tenantsTableColumns,
  tenantTableColumnWidths,
} from "@/components/Tenants/TenantsPage/tenants-table-columns.tsx";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import { useTenants } from "@/hooks/tenants/useTenant.ts";
import { useTenantToTenantTableData } from "@/hooks/TableData/useTenantToTenantTableData.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPage,
  selectFilters,
  selectLimit,
  selectSearch,
  setCurrentPage,
} from "@/store/features/tenants/tenantsSlice.ts";
import DataTable from "@/components/data-table.tsx";

export default function TenantsPage() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const limit = useSelector(selectLimit);
  const search = useSelector(selectSearch);
  const filters = useSelector(selectFilters);
  const { occupancy } = filters;

  const { getAllTenantsQuery } = useTenants({
    currentPage,
    limit,
    search,
    occupancy,
  });

  const { data: content, isLoading } = getAllTenantsQuery;
  const tenants = content?.data;
  const paginationMeta = content?.meta;

  const tenantsTableData = useTenantToTenantTableData({
    currentPage,
    pageSize: limit,
    tenants: tenants ?? [],
  });

  const handleCurrentPageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };
  return (
    <div className="h-[84vh] px-2 overflow-y-auto custom-scrollbar-3">
      <div className="min-h-[90vh]  rounded-xl ">
        <NavigationBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tenants", href: "/tenants" },
          ]}
        />
        <TenantsListHeader />

        <div className="h-[68vh] overflow-y-auto rounded-xl   custom-scrollbar">
          <DataTable
            isLoading={isLoading}
            data={tenantsTableData}
            columns={tenantsTableColumns}
            columnWidths={tenantTableColumnWidths}
            isManualPagination
            page={paginationMeta?.currentPage ?? 1}
            pageSize={paginationMeta?.perPage ?? 10}
            totalElements={paginationMeta?.total ?? tenants?.length ?? 50}
            onPageChange={handleCurrentPageChange}
          />
        </div>
      </div>
    </div>
  );
}

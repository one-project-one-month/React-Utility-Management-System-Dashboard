import TenantsListHeader from "@/components/Tenants/TenantsPage/tenants-list-header.tsx";
import TableContainer from "@/components/shared/Table/table-container.tsx";
import {
  tenantsTableColumns,
  tenantTableColumnWidths,
} from "@/components/Tenants/TenantsPage/tenants-table-columns.tsx";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import { useTenants } from "@/hooks/tenants/useTenant.ts";
import { useTenantToTenantTableData } from "@/hooks/TableData/useTenantToTenantTableData.ts";

export default function TenantsPage() {
  const { getAllTenantsQuery } = useTenants();

  const { data: content, isLoading } = getAllTenantsQuery;
  const tenants = content?.data;

  const tenantsTableData = useTenantToTenantTableData({
    tenants: tenants ?? [],
  });
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
          {/*<TenantsTableContainer />*/}
          <TableContainer
            isLoading={isLoading}
            tableName={"TenantTable"}
            tableData={tenantsTableData}
            columns={tenantsTableColumns}
            columnWidths={tenantTableColumnWidths}
          />
        </div>
      </div>
    </div>
  );
}

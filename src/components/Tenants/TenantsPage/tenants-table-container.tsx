import { useEffect, useState } from "react";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { useNavigate } from "react-router";
import TenantsTablePresentation from "@/components/Tenants/TenantsPage/tenants-table-presentation.tsx";
import { tenantsTableColumns } from "@/components/Tenants/TenantsPage/tenants-table-columns.tsx";

export default function TenantsTableContainer() {
  const [data, setData] = useState<TenantType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const navigate = useNavigate();

  const handleEdit = (tenantId: string) => {
    navigate(`/tenants/update/${tenantId}`);
  };

  const handleDetails = (tenantId: string) => {
    navigate(`/tenants/${tenantId}/details`);
  };

  const columns = tenantsTableColumns({
    onEdit: handleEdit,
    onDetails: handleDetails,
    page,
    pageSize,
  }) as unknown as TenantType[];

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      const start = (page - 1) * pageSize;
      const paginatedData = mockTenants.slice(start, start + pageSize);
      setData(paginatedData);
      setTotalElements(mockTenants.length);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <TenantsTablePresentation
      columns={columns}
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

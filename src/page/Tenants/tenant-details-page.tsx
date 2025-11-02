import { useParams } from "react-router";
import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import TenantDetailsPageHeader from "@/components/Tenants/TenantDetailsPage/tenant-details-page-header.tsx";
import TenantInfo from "@/components/Tenants/TenantDetailsPage/tenant-info.tsx";
import { useTenantById } from "@/hooks/tenants/useTenantById.ts";

import LoadingSpinner from "@/components/common/loading-spinner.tsx";

export default function TenantDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { getTenantByIdQuery } = useTenantById(id as string);
  const { data: content, isLoading } = getTenantByIdQuery;
  const tenant = content?.data;

  if (isLoading) return <LoadingSpinner label={"Loading tenant..."} />;
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div className="h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar-3">
      <div className="h-[calc(100vh-30px)]">
        <HeaderForAllPages action={"viewDetails"} tenantId={id} />
        <TenantDetailsPageHeader tenant={tenant} />
        <TenantInfo tenant={tenant} />
      </div>
    </div>
  );
}

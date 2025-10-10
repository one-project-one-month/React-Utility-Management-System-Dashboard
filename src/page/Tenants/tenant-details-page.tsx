import { useParams } from "react-router";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import TenantDetailsPageHeader from "@/components/Tenants/TenantDetailsPage/tenant-details-page-header.tsx";
import TenantInfo from "@/components/Tenants/TenantDetailsPage/tenant-info.tsx";

export default function TenantDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const tenant = mockTenants.find((tenant) => tenant.id === id);
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div className="h-[calc(100vh-30px)]">
      <HeaderForAllPages action={"viewDetails"} />
      <TenantDetailsPageHeader tenant={tenant} />
      <TenantInfo tenant={tenant} />
    </div>
  );
}

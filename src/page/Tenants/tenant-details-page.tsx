import { useParams } from "react-router";
import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import TenantDetailsPageHeader from "@/components/Tenants/TenantDetailsPage/tenant-details-page-header.tsx";
import TenantInfo from "@/components/Tenants/TenantDetailsPage/tenant-info.tsx";
import { useTenantById } from "@/hooks/tenants/useTenantById.ts";
import { Spinner } from "@heroui/react";

export default function TenantDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { getTenantByIdQuery } = useTenantById(id as string);
  const { data: content, isLoading } = getTenantByIdQuery;
  const tenant = content?.data;

  if (isLoading)
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black/40">
        <div className="flex items-center justify-center w-full h-full">
          <Spinner
            classNames={{ label: "text-white mt-4" }}
            label="Loading tenant..."
            variant="default"
            color="white"
            size="lg"
          />
        </div>
      </div>
    );
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

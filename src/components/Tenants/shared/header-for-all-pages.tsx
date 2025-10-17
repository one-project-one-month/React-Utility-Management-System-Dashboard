import { Pencil, UserRound, History, ChevronLeft } from "lucide-react";

import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router";

interface Props {
  tenantId?: string;
  action: "create" | "update" | "viewDetails" | "viewActivities";
}
export default function HeaderForAllPages({ tenantId, action }: Props) {
  const navigate = useNavigate();

  const items = {
    create: [{ label: "Tenant Registration", href: "/tenants/create" }],
    update: [{ label: "Update Tenant", href: `/tenants/update/${tenantId}` }],
    viewDetails: [
      { label: "Tenant Details", href: `/tenants/${tenantId}/details` },
    ],
    viewActivities: [
      { label: "Tenant Details", href: `/tenants/${tenantId}/details` },
      {
        label: "Tenant Activities History",
        href: `/tenants/${tenantId}/activities`,
      },
    ],
  };

  const currentItems = items[action];
  return (
    <div className="flex-shrink-0   pb-3">
      <NavigationBreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tenants", href: "/tenants" },
          ...currentItems,
        ]}
      />
      <div className="flex items-center gap-3 mb-2 mt-4">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={() => navigate(-1)}
          className="hover:bg-foreground/30"
        >
          <ChevronLeft size={40} className="text-foreground/65" />
        </Button>
        <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
          {action === "create" || action === "viewDetails" ? (
            <UserRound className="w-6 h-6 text-white" />
          ) : action === "update" ? (
            <Pencil className="w-6 h-6 text-white" />
          ) : action === "viewActivities" ? (
            <History className="w-6 h-6 text-white" />
          ) : (
            ""
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground/85">
            {action === "create"
              ? "Tenant Registration"
              : action === "update"
                ? "Update Tenant"
                : action === "viewDetails"
                  ? "Tenant Details"
                  : action === "viewActivities"
                    ? "Tenant Activities History"
                    : ""}
          </h1>
          <p className="text-foreground/50 text-sm">
            {action === "create"
              ? "Register new tenant and assign to room"
              : action === "update"
                ? "Update tenant information "
                : action === "viewDetails"
                  ? "View and manage tenant's personal and contract information."
                  : action === "viewActivities"
                    ? "View tenant's activities history"
                    : ""}
          </p>
        </div>
      </div>{" "}
    </div>
  );
}

import { Button } from "@heroui/button";
import { ChevronLeft, Pencil, UserRound } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  action: "create" | "update" | "viewDetails";
}
export default function HeaderForAllPages({ action }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex-shrink-0 px-4 pt-4 pb-3">
      <div className="flex items-center gap-3 mb-2">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={() => navigate("/tenants")}
          className="hover:bg-slate-100"
        >
          <ChevronLeft size={40} className="text-slate-600" />
        </Button>
        <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
          {action === "create" || action === "viewDetails" ? (
            <UserRound className="w-6 h-6 text-white" />
          ) : action === "update" ? (
            <Pencil className="w-6 h-6 text-white" />
          ) : (
            ""
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {action === "create"
              ? "Tenant Registration"
              : action === "update"
                ? "Update Tenant"
                : action === "viewDetails"
                  ? "Tenant Details"
                  : ""}
          </h1>
          <p className="text-slate-500 text-sm">
            {action === "create"
              ? "Register new tenant and assign to room"
              : action === "update"
                ? "Update tenant information "
                : action === "viewDetails"
                  ? "View and manage tenant's personal and contract information."
                  : ""}
          </p>
        </div>
      </div>{" "}
    </div>
  );
}

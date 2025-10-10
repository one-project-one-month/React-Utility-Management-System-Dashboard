import { Button } from "@heroui/button";
import { ChevronLeft, Pencil, UserRound, History } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  action: "create" | "update" | "viewDetails" | "viewActivities";
}
export default function HeaderForAllPages({ action }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex-shrink-0   pb-3">
      <div className="flex items-center gap-3 mb-2">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={() => navigate(-1)}
          className="hover:bg-slate-100"
        >
          <ChevronLeft size={40} className="text-slate-600" />
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
          <h1 className="text-2xl font-bold text-slate-800">
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
          <p className="text-slate-500 text-sm">
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

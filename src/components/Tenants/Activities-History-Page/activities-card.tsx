import { Card } from "@heroui/card";
import { clsx } from "clsx";
import type { Activity } from "@/types/tenants/ActivityHistory/ActivityType.ts";
import { Chip } from "@heroui/chip";
import { Tooltip, Button } from "@heroui/react";
import { Eye, Calendar, CircleCheck } from "lucide-react";
import BillingDetailsModal from "@/components/Billings/BillingDetails/billing-details-modal.tsx";
import { useNavigate } from "react-router";

interface Props {
  activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
  const navigate = useNavigate();
  return (
    <Card className="mb-4 bg-background px-5 py-4 border border-divider shadow-sm hover:shadow-md transition-all duration-200 rounded-xl hover:border-primary/20 ">
      <div className="flex items-start gap-4">
        <div
          className={clsx(
            "w-12 h-12 rounded-xl flex items-center justify-center ",
            activity.iconColor,
            "shadow-sm",
          )}
        >
          <activity.Icon size={24} />
        </div>

        <div className="flex flex-col flex-1 ">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2 ">
              <h2 className="text-lg font-bold text-foreground truncate ">
                {activity.title}
              </h2>
              <Chip
                variant="flat"
                className={clsx(
                  "font-semibold text-xs px-3 py-1 h-6",
                  activity.statusColor,
                )}
              >
                {activity.status}
              </Chip>
            </div>

            {activity.type === "Billing" && activity.billing && (
              <BillingDetailsModal billing={activity.billing} />
            )}
            {activity.viewDetailsLink?.length && (
              <Tooltip content="View Details" placement="top">
                <Button
                  isIconOnly
                  variant="light"
                  color={"primary"}
                  size="sm"
                  radius={"full"}
                  onPress={() => {
                    if (activity.viewDetailsLink?.length)
                      navigate(activity.viewDetailsLink);
                  }}
                >
                  <Eye size={18} />
                </Button>
              </Tooltip>
            )}
            {!activity.viewDetailsLink?.length &&
              activity.title === "Payment" && (
                <CircleCheck size={18} className="text-green-500" />
              )}
          </div>

          <div className="mb-3">
            <div className="flex gap-2">
              <span className="text-sm font-semibold text-foreground/70">
                {activity.data.key}:
              </span>
              <span className="text-sm font-medium text-foreground">
                {activity.data.value}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-divider">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-foreground/50" />
              <div className="flex  gap-3">
                {activity.date.map((dateItem, index) => (
                  <div key={index} className="flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-foreground/60">
                      {dateItem.key}:
                    </span>
                    <span className="text-sm font-medium text-foreground/70">
                      {dateItem.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "w-2 h-2 rounded-full",
                  activity.typeIndicatorColor,
                )}
              />
              <span className="text-xs font-semibold text-foreground/50">
                {activity.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

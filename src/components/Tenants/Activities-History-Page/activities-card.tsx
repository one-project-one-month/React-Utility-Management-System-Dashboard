import { Card } from "@heroui/card";
import { clsx } from "clsx";
import type { Activity } from "@/constants/mockData/tenants/mockActivities.ts";

interface Props {
  activity: Activity;
}
export default function ActivityCard({ activity }: Props) {
  return (
    <Card className="mb-4 bg-background p-5 border border-divider shadow-sm hover:shadow-md transition-all rounded-xl">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "w-4 h-4 mt-1 rounded-full flex-shrink-0",
            activity.bgColor,
          )}
        ></div>

        <div className="flex flex-col flex-1">
          <h2 className="text-base font-semibold text-foreground">
            {activity.type}{" "}
            <span
              className={clsx(
                "ml-1 font-medium text-sm  rounded-full",
                activity.textColor,
              )}
            >
              {activity.status}
            </span>
          </h2>

          <div className="flex items-center gap-2 text-sm text-foreground/60 mt-1">
            <span>{activity.data}</span>
            <span className="w-1 h-1 rounded-full bg-foreground-500"></span>
            <span>{activity.date}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

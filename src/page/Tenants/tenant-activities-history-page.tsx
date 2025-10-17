import { Card } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { mockTenantActivities } from "@/constants/mockData/tenants/mockActivities.ts";
import { useParams } from "react-router";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import ActivityCard from "@/components/Tenants/Activities-History-Page/activities-card.tsx";

export default function TenantActivitiesHistoryPage() {
  const { id } = useParams<{ id: string }>();

  const tenant = mockTenants.find((tenant) => tenant.id === id);
  const all = mockTenantActivities;
  const payments = all.filter((activity) => activity.type === "Payment");
  const services = all.filter((activity) => activity.type === "Service");
  const contracts = all.filter((activity) => activity.type === "Contract");

  const tabs = [
    { id: "all", label: "All", content: all },
    { id: "serviceHistory", label: "Service History", content: services },
    { id: "paymentHistory", label: "Payment History", content: payments },
    { id: "contractHistory", label: "Contract History", content: contracts },
  ];

  return (
    <div className="h-[calc(100vh-70px)] rounded-2xl overflow-y-auto custom-scrollbar-3">
      <Card className="p-6 h-[calc(100vh-30px)] ">
        <div className="flex flex-col gap-1">
          <HeaderForAllPages action={"viewActivities"} tenantId={id} />

          <h2 className="text-lg font-semibold text-foreground-400 tracking-tight">
            Tenant Name:{" "}
            <span className="text-foreground-500">{tenant?.name}</span>
          </h2>

          <div className="flex w-full flex-col mt-4">
            <Tabs aria-label="Dynamic tabs" items={tabs} color="primary">
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  <div className=" gap-5 mt-3 h-[calc(100vh-310px)]  overflow-y-auto custom-scrollbar pr-2">
                    {item.content.map((activity, index) => (
                      <ActivityCard activity={activity} key={index} />
                    ))}
                  </div>
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}

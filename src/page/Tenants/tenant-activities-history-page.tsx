import { Card } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { useParams } from "react-router";
import HeaderForAllPages from "@/components/Tenants/shared/header-for-all-pages.tsx";
import ActivityCard from "@/components/Tenants/Activities-History-Page/activities-card.tsx";
import { useActivitiesHistoryByTenantId } from "@/hooks/tenants/useActivitiesHistoryByTenantId.ts";
import {
  billingToActivity,
  contractToActivity,
  serviceToActivity,
} from "@/lib/utils.ts";
import { useTenantById } from "@/hooks/tenants/useTenantById.ts";
import type { Contract } from "@/types/tenants/tenantType.ts";
import LoadingSpinner from "@/components/common/loading-spinner.tsx";

export default function TenantActivitiesHistoryPage() {
  const { id: tenantId } = useParams<{ id: string }>();

  const { getTenantByIdQuery } = useTenantById(tenantId ?? "");
  const {
    getBillingHistoryByTenantIdQuery,
    getCustomerServiceHistoryByTenantIdQuery,
    getContractHistoryByTenantIdQuery,
  } = useActivitiesHistoryByTenantId(tenantId ?? "");

  const { data: content, isLoading: isLoadingTenant } = getTenantByIdQuery;
  const tenant = content?.data;

  const { data: billingContent, isLoading: isLoadingBilling } =
    getBillingHistoryByTenantIdQuery;

  const { data: serviceContent, isLoading: isLoadingService } =
    getCustomerServiceHistoryByTenantIdQuery;

  const { data: contractContent, isLoading: isLoadingContract } =
    getContractHistoryByTenantIdQuery;

  const billings = billingContent?.data ?? [];
  const services = serviceContent?.data ?? [];
  // const contracts = contractContent?.data ?? [];
  const contracts = contractContent?.data;

  const billingActivities = billings.flatMap((billing) =>
    billingToActivity(billing),
  );

  const serviceActivities = services.map((service) =>
    serviceToActivity(service),
  );

  // const contractActivities = contracts.map((contract) =>
  //   contractToActivity(contract),
  // );

  const contractActivities = [contractToActivity(contracts as Contract)]; // တကယ်တမ်းအပေါ်ကအတိုင်းလုပ်ရမှာ။ backend က array နဲ့ ပြန်မထားလို့ ဒီတိုင်းခနလုပ်ထား.

  const allActivities = [
    ...billingActivities,
    ...serviceActivities,
    ...contractActivities,
  ];

  const tabs = [
    { id: "all", label: "All", content: allActivities },
    {
      id: "serviceHistory",
      label: "Service History",
      content: serviceActivities,
    },
    {
      id: "billingHistory",
      label: "Billing History",
      content: billingActivities,
    },
    {
      id: "contractHistory",
      label: "Contract History",
      content: contractActivities,
    },
  ];

  const isLoading =
    isLoadingTenant ||
    isLoadingBilling ||
    isLoadingService ||
    isLoadingContract;
  if (isLoading)
    return <LoadingSpinner label={"Loading tenant's activities..."} />;

  return (
    <div className="h-[calc(100vh-70px)] -mt-10 rounded-2xl overflow-y-auto custom-scrollbar-3">
      <Card className="p-6 h-[calc(100vh-30px)] ">
        <div className="flex flex-col gap-1">
          <HeaderForAllPages action={"viewActivities"} tenantId={tenantId} />

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

import { Card } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import clsx from "clsx";
import { mockTenantActivities } from "@/constants/mockData/tenants/mockActivities.ts";

export default function ActivityHistory() {
  const all = mockTenantActivities;
  const payments = all.filter((a) => a.type === "Payment");
  const services = all.filter((a) => a.type === "Service");
  const contracts = all.filter((a) => a.type === "Contract");

  const tabs = [
    {
      id: "all",
      label: "All",
      content: all,
    },
    {
      id: "serviceHistory",
      label: "Service History",
      content: services,
    },
    {
      id: "paymentHistory",
      label: "Payment History",
      content: payments,
    },
    {
      id: "contractHistory",
      label: "Contract History",
      content: contracts,
    },
  ];

  return (
    <div className="mt-8">
      <Card className="p-5">
        <div className="flex flex-col items-start gap-2 ">
          <h1 className="text-lg font-bold  ">Activity</h1>
          <div className="flex w-full flex-col  mt-5">
            <Tabs aria-label="Dynamic tabs" items={tabs} color="primary">
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  <div className="flex flex-col gap-6">
                    {item.content.map((c) => {
                      let title = "";
                      let data = "";
                      if (
                        c.type === "Payment" &&
                        "status" in c.data &&
                        "totalAmount" in c.data
                      ) {
                        title =
                          c.data.status === "Paid"
                            ? "Payment Received"
                            : c.data.status === "Overdue"
                              ? "Billing Overdue"
                              : "";

                        data = c.data.totalAmount.toString();
                      } else if (
                        c.type === "Service" &&
                        "category" in c.data &&
                        "status" in c.data &&
                        "description" in c.data
                      ) {
                        title = `${c.data.category} request ${c.data.status}`;
                        data = c.data.description;
                      } else if (
                        c.type === "Contract" &&
                        "contractName" in c.data
                      ) {
                        title = "Contract Renewed";
                        data = c.data.contractName;
                      } else {
                        title = "Something Went Wrong!";
                      }
                      if (c.type)
                        return (
                          <Card className="bg-gray-200 p-4 px-5">
                            <div className="flex items-center gap-5">
                              <div
                                className={clsx(
                                  "w-4 h-4 rounded-full flex items-center justify-center text-white font-medium",
                                  c.type === "Payment"
                                    ? "bg-green-500"
                                    : c.type === "Service"
                                      ? "bg-orange-500"
                                      : c.type === "Contract"
                                        ? "bg-blue-500"
                                        : "bg-gray-400",
                                )}
                              ></div>
                              <div className="flex flex-col">
                                <h1>{title}</h1>
                                <div className="flex items-center gap-2">
                                  <span>{data}</span>
                                  <span
                                    className="w-1 h-1 rounded-full bg-black
                                    "
                                  ></span>
                                  <span>{c.date}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                    })}
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

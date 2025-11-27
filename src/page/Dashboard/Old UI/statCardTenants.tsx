import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Total Revenue
function StatCardTenants({
     icon,
     title,
     currentTenants,
     lastTotal,
}: {
     icon?: React.ReactNode;
     title: string;
     currentTenants: number;
     lastTotal: number;
}) {
     const change = ((currentTenants - lastTotal) / lastTotal) * 100;
     const isPositive = change >= 0;
     const formattedChange = `${change.toFixed(0)}%`;
     return (
          <Card className="p-4 relative flex-[1]">
               <CardHeader className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                         {icon}
                         <h3 className="text-gray-800 text-xl font-normal dark:text-gray-200">
                              {title}
                         </h3>
                    </div>
               </CardHeader>
               <CardBody>
                    <div className="flex justify-between items-end gap-6">
                         {/* current tenants */}
                         <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                              {currentTenants}
                         </p>

                         {/* chip arrow */}
                         <div className="flex items-center gap-2">
                              <Chip
                                   color={isPositive ? "success" : "danger"}
                                   size="lg"
                                   radius="sm"
                                   variant="flat"
                                   className="flex items-center gap-1"
                              >
                                   {isPositive ? (
                                        <ArrowUpRight
                                             size={14}
                                             className="inline-block"
                                        />
                                   ) : (
                                        <ArrowDownRight
                                             size={14}
                                             className="inline-block"
                                        />
                                   )}
                                   {formattedChange}
                              </Chip>

                              {/* last month tenants total */}
                              <p className="text-sm text-gray-800 mt-[8px] dark:text-gray-200">
                                   Last month total: {lastTotal}
                              </p>
                         </div>
                    </div>
               </CardBody>
          </Card>
     );
}

export default StatCardTenants;

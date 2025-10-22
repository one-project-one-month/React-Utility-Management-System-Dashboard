import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@heroui/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Total Revenue
function StatCardRevenue({
     icon,
     title,
     currentValue,
     lastTotal,
}: {
     icon?: React.ReactNode;
     title: string;
     currentValue: number;
     lastTotal: number;
}) {
     const change = ((currentValue - lastTotal) / lastTotal) * 100;
     const isPositive = change >= 0;
     const formattedChange = `${change.toFixed(0)}%`;
     const formattedValue = new Intl.NumberFormat("en-MY", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
     }).format(currentValue);
     const formattedTotal = new Intl.NumberFormat("en-MY", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
     }).format(lastTotal);
     return (
          <Card className="p-4 relative flex-[2]">
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
                         {/* current value */}
                         <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                              {formattedValue} MMK
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

                              {/* total value */}
                              <p className="text-sm text-gray-800 mt-[8px] dark:text-gray-200">
                                   Last month total: {formattedTotal} MMK
                              </p>
                         </div>
                    </div>
               </CardBody>
          </Card>
     );
}

export default StatCardRevenue;

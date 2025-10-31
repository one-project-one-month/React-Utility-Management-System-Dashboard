import { Card, CardHeader, CardBody, CardFooter, Chip } from "@heroui/react";
import {
     // ArrowUpRight,
     ArrowDownRight,
     // CircleDollarSign,
     CircleAlert,
} from "lucide-react";
import RevenueIcon from "../../assets/dashboard-icons/icons-from-dashboard-screen/Total Revenue.svg";
// import WarningIcon from "../../assets/dashboard-icons/icons-from-invoice-screen/warning.svg";
import ArrowUp from "../../assets/dashboard-icons/nav-icons/grow.svg";

// Total Revenue
function StatCardRevenue({
     title,
     currentValue,
     lastTotal,
}: {
     title: string;
     currentValue: number;
     lastTotal: number;
}) {
     const change = ((currentValue - lastTotal) / lastTotal) * 100;
     const isPositive = change >= 0;
     const formattedChange = `${isPositive ? "+" : ""}${change.toFixed(0)}%`;
     const formattedValue = new Intl.NumberFormat("en-MY", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
     }).format(currentValue);
     return (
          // transition delay-100 duration-250 ease-in-out hover:scale-110
          <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader>
                    <div className="flex w-full justify-between items-center">
                         {/* Chip Icon */}
                         <Chip
                              color={isPositive ? "primary" : "danger"}
                              size="lg"
                              radius="sm"
                              variant="flat"
                              className="h-12"
                         >
                              {isPositive ? (
                                   // <CircleDollarSign size={24} />
                                   <img
                                        src={RevenueIcon}
                                        alt="Revenue Icon"
                                        className="scale-140"
                                   />
                              ) : (
                                   <CircleAlert size={24} />
                                   // <img
                                   //      src={WarningIcon}
                                   //      alt="Revenue Icon"
                                   //      className="scale-150"
                                   // />
                              )}
                         </Chip>

                         {/* Chip Arrow: */}
                         <Chip
                              color={isPositive ? "success" : "danger"}
                              size="lg"
                              radius="full"
                              variant="light"
                              className="h-12"
                         >
                              {isPositive ? (
                                   // <ArrowUpRight size={24} />
                                   <img
                                        src={ArrowUp}
                                        alt="Revenue Icon"
                                        // className="scale-100"
                                   />
                              ) : (
                                   <ArrowDownRight size={24} />
                              )}
                         </Chip>
                    </div>
               </CardHeader>

               {/* BODY */}
               <CardBody className="pt-2">
                    <h3 className="text-gray-600 text-xl mb-2.5 dark:text-gray-400">
                         {title}
                    </h3>
                    <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">
                         {formattedValue} MMK
                    </p>
               </CardBody>

               {/* FOOTER */}
               <CardFooter className="pt-0">
                    <p className="text-gray-600 text-xl dark:text-gray-400">
                         {formattedChange} from last month
                    </p>
               </CardFooter>
          </Card>
     );
}

export default StatCardRevenue;

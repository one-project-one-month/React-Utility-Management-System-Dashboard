import {
     Card,
     CardHeader,
     CardBody,
     CardFooter,
     Chip,
     Skeleton,
} from "@heroui/react";
import {
     CircleAlert,
     CircleCheck,
     Construction,
     AlarmClockCheck,
} from "lucide-react";
import { useGetPendingIssuesCount } from "@/hooks/dashboardData/useDashboardData.ts";

// Pending Issues
function StatCardPending() {
     const { data: pendingIssuesCountContent, isLoading: isLoadingPending } =
          useGetPendingIssuesCount();
     const pendingIssuesCount =
          pendingIssuesCountContent?.data.statusCount ?? 0;
     const highPriority =
          pendingIssuesCountContent?.data.statusAndPriorityCount ?? 0;
     const isPositive: boolean = pendingIssuesCount === 0;
     return (
          //  transition delay-100 duration-250 ease-in-out hover:scale-110
          <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader>
                    <div className="flex w-full justify-between items-center">
                         {/* Chip Icon */}
                         {isLoadingPending ? (
                              <Skeleton className="h-12 w-14 rounded-lg" />
                         ) : (
                              <Chip
                                   color={isPositive ? "primary" : "danger"}
                                   size="lg"
                                   radius="sm"
                                   variant="flat"
                                   className="h-12"
                              >
                                   {isPositive ? (
                                        <AlarmClockCheck size={24} />
                                   ) : (
                                        <CircleAlert size={24} />
                                   )}
                              </Chip>
                         )}

                         {/* Chip Arrow: */}
                         {isLoadingPending ? (
                              <Skeleton className="h-12 w-14 rounded-full" />
                         ) : (
                              <Chip
                                   color={isPositive ? "success" : "danger"}
                                   size="lg"
                                   radius="full"
                                   variant="light"
                                   className="h-12"
                              >
                                   {isPositive ? (
                                        <CircleCheck size={24} />
                                   ) : (
                                        <Construction size={24} />
                                   )}
                              </Chip>
                         )}
                    </div>
               </CardHeader>

               {/* BODY */}
               <CardBody className="pt-2">
                    {isLoadingPending ? (
                         <Skeleton className="mt-1 h-6 w-29 rounded-lg mb-3.5" />
                    ) : (
                         <h3 className="text-gray-600 text-lg mb-3.5 dark:text-gray-400">
                              Pending Issues
                         </h3>
                    )}
                    {isLoadingPending ? (
                         <Skeleton className="mt-1 h-7 w-8 rounded-lg" />
                    ) : (
                         <p className="text-2xl font-normal text-gray-800 dark:text-gray-200">
                              {pendingIssuesCount}
                         </p>
                    )}
               </CardBody>

               {/* FOOTER */}
               <CardFooter className="pt-0">
                    {isLoadingPending ? (
                         <Skeleton className="mb-1 h-6 w-40 rounded-lg" />
                    ) : (
                         <p className="text-gray-600 text-md dark:text-gray-400">
                              {isPositive
                                   ? "No high priority"
                                   : `${highPriority} high priority`}
                         </p>
                    )}
               </CardFooter>
          </Card>
     );
}

export default StatCardPending;

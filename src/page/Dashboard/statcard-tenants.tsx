import {
     Card,
     CardHeader,
     CardBody,
     CardFooter,
     Chip,
     Skeleton,
} from "@heroui/react";
import { Users, CircleCheck, CircleX, CircleAlert } from "lucide-react";

// Total Tenants
function StatCardTenants({
     isLoading,
     title,
     activeTenants,
     totalRoom,
}: {
     isLoading: boolean;
     title: string;
     activeTenants: number;
     totalRoom: number;
}) {
     const isPositive: boolean =
          activeTenants > 0 && activeTenants <= totalRoom;
     return (
          //  transition delay-100 duration-250 ease-in-out hover:scale-110
          <Card className="p-1 w-full">
               {/* HEADER */}
               <CardHeader>
                    <div className="flex w-full justify-between items-center">
                         {/* Chip Icon */}
                         {isLoading ? (
                              <Skeleton className="h-12 w-14 rounded-lg" />
                         ) : (
                              <Chip
                                   color={isPositive ? "success" : "danger"}
                                   size="lg"
                                   radius="sm"
                                   variant="flat"
                                   className="h-12"
                              >
                                   {isPositive ? (
                                        <Users size={24} />
                                   ) : (
                                        <CircleAlert size={24} />
                                   )}
                              </Chip>
                         )}

                         {/* Chip Arrow: */}
                         {isLoading ? (
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
                                        <CircleX size={24} />
                                   )}
                              </Chip>
                         )}
                    </div>
               </CardHeader>

               {/* BODY */}
               <CardBody className="pt-2">
                    {isLoading ? (
                         <Skeleton className="mt-1 h-6 w-29 rounded-lg mb-3.5" />
                    ) : (
                         <h3 className="text-gray-600 text-lg mb-3.5 dark:text-gray-400">
                              {title}
                         </h3>
                    )}
                    {isLoading ? (
                         <Skeleton className="mt-1 h-7 w-8 rounded-lg" />
                    ) : (
                         <p className="text-2xl font-normal text-gray-800 dark:text-gray-200">
                              {activeTenants}
                         </p>
                    )}
               </CardBody>

               {/* FOOTER */}
               <CardFooter className="pt-0">
                    {isLoading ? (
                         <Skeleton className="mb-1 h-6 w-40 rounded-lg" />
                    ) : (
                         <p className="text-gray-600 text-md dark:text-gray-400">
                              Out of {totalRoom} total rooms
                         </p>
                    )}
               </CardFooter>
          </Card>
     );
}

export default StatCardTenants;

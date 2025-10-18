import { Card, CardHeader, CardBody, CardFooter, Chip } from "@heroui/react";
import { Users, CircleCheck, CircleX, CircleAlert } from "lucide-react";

// Total Tenants
function StatCardTenants({
     title,
     activeTenants,
     totalRoom,
}: {
     title: string;
     activeTenants: number;
     totalRoom: number;
}) {
     const isPositive: boolean =
          activeTenants > 0 && activeTenants <= totalRoom ? true : false;
     return (
          <Card className="p-1 w-full transition delay-100 duration-250 ease-in-out hover:scale-110">
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
                                   <Users size={24} />
                              ) : (
                                   <CircleAlert size={24} />
                              )}
                         </Chip>

                         {/* Chip Arrow: */}
                         <Chip
                              color={isPositive ? "success" : "danger"}
                              size="lg"
                              radius="full"
                              variant="flat"
                              className="h-12"
                         >
                              {isPositive ? (
                                   <CircleCheck size={24} />
                              ) : (
                                   <CircleX size={24} />
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
                         {activeTenants}
                    </p>
               </CardBody>

               {/* FOOTER */}
               <CardFooter className="pt-0">
                    <p className="text-gray-600 text-xl dark:text-gray-400">
                         Out of {totalRoom} total rooms
                    </p>
               </CardFooter>
          </Card>
     );
}

export default StatCardTenants;

import { Card, CardHeader, CardBody, CardFooter, Chip } from "@heroui/react";
import {
     CircleAlert,
     CircleCheck,
     Construction,
     AlarmClockCheck,
} from "lucide-react";

// Pending Issues
function StatCardPending({
     title,
     pendingIssues,
     highPriority,
}: {
     title: string;
     pendingIssues: number;
     highPriority: number;
}) {
     const isPositive: boolean = pendingIssues === 0 ? true : false;
     return (
          //  transition delay-100 duration-250 ease-in-out hover:scale-110
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
                                   <AlarmClockCheck size={24} />
                              ) : (
                                   <CircleAlert size={24} />
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
                                   <CircleCheck size={24} />
                              ) : (
                                   <Construction size={24} />
                              )}
                         </Chip>
                    </div>
               </CardHeader>

               {/* BODY */}
               <CardBody className="pt-2">
                    <h3 className="text-gray-600 text-lg mb-3.5 dark:text-gray-400">
                         {title}
                    </h3>
                    <p className="text-2xl font-normal text-gray-800 dark:text-gray-200">
                         {pendingIssues}
                    </p>
               </CardBody>

               {/* FOOTER */}
               <CardFooter className="pt-0">
                    <p className="text-gray-600 text-md dark:text-gray-400">
                         {isPositive
                              ? "No high priority"
                              : `${highPriority} high priority`}
                    </p>
               </CardFooter>
          </Card>
     );
}

export default StatCardPending;

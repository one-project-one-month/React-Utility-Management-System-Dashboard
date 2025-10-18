import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";

// Total Revenue
function StatCardRoom({
     icon,
     title,
     totalRoom,
     available,
}: {
     icon?: React.ReactNode;
     title: string;
     totalRoom: number;
     available: number;
}) {
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
                         {/* total room */}
                         <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                              {totalRoom}
                         </p>

                         {/* available */}
                         <p className="text-sm text-gray-800 mt-[8px] dark:text-gray-200">
                              Available: {available}
                         </p>
                    </div>
               </CardBody>
          </Card>
     );
}

export default StatCardRoom;

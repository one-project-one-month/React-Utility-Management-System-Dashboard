import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import {
     ResponsiveContainer,
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
} from "recharts";

const data = [
     {
          name: "May",
          uv: 4000,
          pv: 80,
          amt: 2400,
     },
     {
          name: "Jun",
          uv: 3000,
          pv: 90,
          amt: 2210,
     },
     {
          name: "July",
          uv: 2000,
          pv: 112,
          amt: 2290,
     },
     {
          name: "Aug",
          uv: 2780,
          pv: 85,
          amt: 2000,
     },
];

export default function Rechart() {
     return (
          <Card className="p-4">
               <CardHeader className="flex justify-between items-center">
                    <h3 className="text-gray-600 text-xl dark:text-gray-400">
                         Monthly Unit Usage Comparison
                    </h3>
                    <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">
                         Total - Total Unit
                    </p>
               </CardHeader>
               <CardBody>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                   data={data}
                                   margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                   }}
                              >
                                   <CartesianGrid strokeDasharray="10 10" />
                                   <XAxis dataKey="name" />
                                   <YAxis />
                                   <Tooltip />
                                   <Legend />
                                   <Bar
                                        dataKey="usage"
                                        fill="#4F46E5"
                                        radius={[6, 6, 0, 0]}
                                   />
                              </BarChart>
                         </ResponsiveContainer>
                    </div>
               </CardBody>
               <CardFooter></CardFooter>
          </Card>
     );
}

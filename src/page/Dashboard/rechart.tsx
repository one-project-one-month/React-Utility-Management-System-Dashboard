import { Card, CardHeader, CardBody } from "@heroui/react";
import {
     ResponsiveContainer,
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
} from "recharts";

type chartData = {
     name: string;
     unit: number;
};

const data: chartData[] = [
     {
          name: "May",
          unit: 80,
     },
     {
          name: "June",
          unit: 90,
     },
     {
          name: "July",
          unit: 112,
     },
     {
          name: "August",
          unit: 85,
     },
];

const total: number = data.reduce((sum: number, item: chartData) => {
     return sum + item.unit;
}, 0);

export default function Rechart() {
     return (
          <Card className="p-4">
               <CardHeader className="flex justify-between items-center">
                    <h3 className="text-gray-600 text-xl dark:text-gray-400">
                         Monthly Unit Usage Comparison
                    </h3>
                    <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                         Total - {total} Unit
                    </p>
               </CardHeader>
               <CardBody>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                              <BarChart barSize={30} data={data}>
                                   <CartesianGrid strokeDasharray="3 10" />
                                   <XAxis
                                        dataKey="name"
                                        padding={{ left: 30, right: 30 }}
                                        // stroke="#8884d8"
                                        axisLine={false}
                                        tickLine={false}
                                   />
                                   <YAxis
                                        dataKey="height"
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[50, 150]}
                                        ticks={[50, 75, 100, 125, 150]}
                                   />
                                   <Bar
                                        dataKey="unit"
                                        // fill="var(--rechart-bar-fill)"
                                        fill="#4C4C4C"
                                        radius={[10, 10, 0, 0]}
                                        // className="text-gray-800 dark:text-gray-200"
                                        // background={{
                                        //      fill: "var(--rechart-bar-background)",
                                        //      radius: [4, 4, 0, 0],
                                        // }}
                                   />
                              </BarChart>
                         </ResponsiveContainer>
                    </div>
                    <div className="p-4">
                         {data.map((item, index) => (
                              <div
                                   key={index}
                                   className={`flex justify-between items-center ${
                                        index > 0 ? "pt-3" : ""
                                   }`}
                              >
                                   <h3 className="text-gray-600 text-l dark:text-gray-400 ml-11">
                                        {item.name} Utility Units Usage
                                   </h3>
                                   <p className="text-l font-extrabold text-gray-800 dark:text-gray-200 mr-14">
                                        {item.unit} Unit
                                   </p>
                              </div>
                         ))}
                    </div>
               </CardBody>
          </Card>
     );
}

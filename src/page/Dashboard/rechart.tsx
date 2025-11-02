import { Card, CardHeader, CardBody } from "@heroui/react";
import {
     ResponsiveContainer,
     BarChart,
     Bar,
     XAxis,
     YAxis,
     CartesianGrid,
} from "recharts";

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const barColor = isDark ? "#63A5F2ff" : "#132945ff";
// const barBackColor = isDark ? ""

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
                    <h3 className="text-gray-600 text-lg dark:text-gray-400">
                         Monthly Unit Usage Comparison
                    </h3>
                    <p className="text-2xl font-normal text-gray-800 dark:text-gray-200">
                         Total - {total} Unit
                    </p>
               </CardHeader>
               <CardBody>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                              <BarChart barSize={80} data={data}>
                                   <CartesianGrid
                                        strokeDasharray="4 6"
                                        vertical={false}
                                        stroke="#2563EB"
                                   />
                                   <XAxis
                                        dataKey="name"
                                        padding={{ left: -30, right: -30 }}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6B7280", fontSize: 14 }}
                                   />
                                   <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[50, 150]}
                                        ticks={[50, 75, 100, 125, 150]}
                                        // tick={{ fill: "#6B7280", fontSize: 14 }}
                                        tick={({ x, y, payload }) => (
                                             <text
                                                  x={x - 5}
                                                  y={y + 5}
                                                  fill="#6B7280"
                                                  fontSize={14}
                                                  textAnchor="end"
                                             >
                                                  {payload.value} Unit
                                             </text>
                                        )}
                                   />
                                   <Bar
                                        dataKey="unit"
                                        background={{ fill: "#eee" }}
                                        fill={barColor}
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
                                   <h3 className="text-gray-600 text-md dark:text-gray-400 ml-11">
                                        {item.name} Utility Units Usage
                                   </h3>
                                   <p className="text-md font-normal text-gray-800 dark:text-gray-200 mr-14">
                                        {item.unit} Unit
                                   </p>
                              </div>
                         ))}
                    </div>
               </CardBody>
          </Card>
     );
}

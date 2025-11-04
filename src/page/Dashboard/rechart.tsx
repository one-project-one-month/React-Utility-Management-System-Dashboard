import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useGetTotalUnitsByMonth } from "@/hooks/dashboardData/useDashboardData.ts";

// const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// const barColor = isDark ? "#63A5F2ff" : "#132945ff";
// const barBackColor = isDark ? ""

// type chartData = {
//   month: string;
//   totalUnits: number;
// };

// const data: chartData[] = [
//   {
//     month: "November 2025",
//     totalUnits: 3758.2400000000002,
//   },
//   {
//     month: "October 2025",
//     totalUnits: 21883.44000000002,
//   },
//   {
//     month: "September 2025",
//     totalUnits: 13931.900000000001,
//   },
//   {
//     month: "August 2025",
//     totalUnits: 15124.600000000002,
//   },
// ];

export default function Rechart() {
  const { data: content } = useGetTotalUnitsByMonth();
  const totalUnits = content?.data ?? [];

  const total = totalUnits.reduce((sum, item) => sum + item.totalUnits, 0);

  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-gray-600 text-lg dark:text-gray-400">
          Monthly Unit Usage Comparison
        </h3>
        <p className="text-2xl font-normal text-gray-800 dark:text-gray-200">
          Total - {Math.ceil(total)} Unit
        </p>
      </CardHeader>
      <CardBody>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart barSize={50} data={totalUnits}>
              <CartesianGrid
                strokeDasharray="4 6"
                vertical={false}
                stroke="#2563EB"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 14 }}
                tickFormatter={(value) => `${value.split(" ")[0]}`}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${Math.ceil(value)} Unit`}
              />
              <Bar
                dataKey="totalUnits"
                background={{ fill: "var(--color-chart-bg)" }}
                fill={"var(--color-chart-primary)"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 space-y-3">
          {totalUnits.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <h3 className="text-gray-600 text-md dark:text-gray-400 ml-2">
                {item.month.split(" ")[0]} Utility Units Usage
              </h3>
              <p className="text-md font-normal text-gray-800 dark:text-gray-200 mr-2">
                {Math.ceil(item.totalUnits)} Unit
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

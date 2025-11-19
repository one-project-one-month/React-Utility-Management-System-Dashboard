import { Card, CardHeader, CardBody } from "@heroui/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { parse, format } from "date-fns";
import { useFetchRevenueAnalytics } from "./hooks/useFetchAnalytics";

export default function BillRevenueAnalytics() {
    const { data: revenueAnalytics } = useFetchRevenueAnalytics()

    const data = Object.entries(revenueAnalytics?.data || {})
        .map(([month, value]) => ({
            month,
            value,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
   
    return (
        <Card className="p-4 rounded-2xl shadow-lg">
            <CardHeader className="font-semibold">
                Monthly Revenue Analytics
            </CardHeader>

            <CardBody>
                <ResponsiveContainer width="100%" height={550}>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="month"
                            tickFormatter={(value: string) => {
                                const date = parse(value, "yyyy-MM", new Date());
                                return format(date, "MMM");
                            }}
                        />

                        <YAxis
                            tickFormatter={(val) => {
                                if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + "M";
                                if (val >= 1_000) return (val / 1_000).toFixed(1) + "k";
                                return val;
                            }}
                        />

                        <Tooltip
                            formatter={(value: number) => value.toLocaleString()}
                            contentStyle={{
                                backgroundColor: "rgba(30, 30, 30, 0.9)",
                                border: "1px solid #4F46E5",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                            labelStyle={{
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                            itemStyle={{
                                color: "#fff",
                            }}
                        />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            dot={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
}

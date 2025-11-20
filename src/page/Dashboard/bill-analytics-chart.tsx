import { useState } from "react";
import { Card, CardHeader, CardBody, Select, SelectItem } from "@heroui/react";
import { format, parse } from "date-fns";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useFetchBillAnalytics } from "./hooks/useFetchAnalytics";
import LoadingSpinner from "@/components/loading-spinner";

const MONTHS = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

export default function BillAnalyticsChart() {
    const currentMonth = new Date().getMonth() + 1;
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    const { data: billAnalytics, isPending } = useFetchBillAnalytics(selectedMonth);
    const raw = billAnalytics?.data;

    const data = raw
        ? [
            {
                month: raw.month,
                pending: raw.pending,
                paid: raw.paid,
                overdue: raw.overdue,
            },
        ]
        : [];

    const isEmpty =
        data.length === 0 ||
        (data[0].pending === 0 &&
            data[0].paid === 0 &&
            data[0].overdue === 0);

    return (
        <Card className="p-4 rounded-2xl shadow-lg">
            <CardHeader className="flex justify-between items-center">
                <h2 className="font-semibold">Monthly Bill Analytics</h2>
                <Select
                    className="w-[200px]"
                    variant="bordered"
                    onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0];
                        setSelectedMonth(Number(key));
                    }}
                    defaultSelectedKeys={new Set([String(selectedMonth)])}
                >
                    {MONTHS.map((option) => (
                        <SelectItem key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>

            </CardHeader>

            <CardBody className="h-[450px] flex items-center justify-center">
                {isPending && <LoadingSpinner label="Loading..." />}
                {!isPending && isEmpty ? (
                    <p className="text-neutral-500 text-lg">Not Available</p>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis
                                dataKey="month"
                                tickFormatter={(value) => {
                                    const date = parse(value, "yyyy-MM", new Date());
                                    return format(date, "MMMM");
                                }}
                            />

                            <YAxis
                                tickFormatter={(value) => {
                                    if (value >= 1_000_000)
                                        return (value / 1_000_000).toFixed(1) + "M";
                                    if (value >= 1_000)
                                        return (value / 1_000).toFixed(1) + "k";
                                    return value;
                                }}
                            />

                            <Tooltip
                                formatter={(value, name) => {
                                    const display =
                                        String(name).charAt(0).toUpperCase() +
                                        String(name).slice(1);
                                    return [value.toLocaleString(), display];
                                }}
                                labelStyle={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}
                                itemStyle={{ color: "#fff", fontSize: "13px" }}
                                contentStyle={{
                                    backgroundColor: "rgba(20, 20, 20, 0.9)",
                                    border: "1px solid #333",
                                    borderRadius: "8px",
                                    color: "#fff",
                                }}
                            />

                            <Legend />
                            <Bar dataKey="pending" fill="#FFA500" />
                            <Bar dataKey="paid" fill="#4CAF50" />
                            <Bar dataKey="overdue" fill="#FF4D4F" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardBody>


        </Card>
    );
}

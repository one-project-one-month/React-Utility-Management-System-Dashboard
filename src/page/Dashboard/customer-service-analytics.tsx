import { Card, CardHeader, CardBody, Select, SelectItem, DateRangePicker, Button } from "@heroui/react";
import { CalendarDate, parseDate } from '@internationalized/date';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useFetchCustomerServiceAnalytics } from "./hooks/useFetchAnalytics";
import type {
    CustomerServiceCategory,
    CustomerServicePriority,
    CustomerServiceStatus,
    CustomerServiceFilter
} from "@/types/dashboard";
import { useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";

type AnalyticsData =
    | CustomerServiceCategory
    | CustomerServicePriority
    | CustomerServiceStatus;

const KEY_WORDS = [
    { key: "category", label: "Filter By Category" },
    { key: "status", label: "Filter By Status" },
    { key: "priority", label: "Filter By Priority" },
]

const STATUS = [
    { key: "Pending", label: "Pending" },
    { key: "Ongoing", label: "Ongoing" },
    { key: "Resolved", label: "Resolved" },
]

const transformData = (data: AnalyticsData | undefined) => {
    if (!data) return [];

    // CATEGORY
    if ("countByCategory" in data) {
        return Object.entries(data.countByCategory).map(([name, value]) => ({
            name,
            count: value
        }));
    }

    // PRIORITY
    if ("countByPriority" in data) {
        return Object.entries(data.countByPriority).map(([name, value]) => ({
            name,
            count: value
        }));
    }

    // STATUS
    if ("countByStatus" in data) {
        return Object.entries(data.countByStatus).map(([name, stats]) => ({
            name,
            all: stats.all,
            high: stats.high,
            medium: stats.medium,
            low: stats.low
        }));
    }

    return [];
};

const toCalendarDate = (date: Date) => {
    return parseDate(date.toISOString().slice(0, 10));
};

const toJSDate = (d: CalendarDate) => new Date(d.year, d.month - 1, d.day);

const CustomerServiceAnalytics = () => {
    const [filter, setFilter] = useState<CustomerServiceFilter>({
        query: "category",
        from: new Date("2025-06-20"),
        to: new Date("2025-12-18")
    });

    const [appliedFilter, setAppliedFilter] = useState(filter);

    const { data, isPending, isSuccess } = useFetchCustomerServiceAnalytics(appliedFilter);

    const analytics = data?.data;

    const chartData = transformData(analytics);

    const isStatusType = chartData.length > 0 && "all" in chartData[0];

    return (
        <Card className="p-4 shadow-md">
            <CardHeader className="flex justify-between items-start gap-2">
                <h2 className="font-semibold w-full">Customer Service Analytics</h2>
                <div className="flex flex-col gap-1 w-full">
                    <DateRangePicker
                        className="max-w-xs self-end"
                        label="From - To"
                        value={{
                            start: toCalendarDate(filter.from),
                            end: toCalendarDate(filter.to)
                        }}
                        onChange={(range) => {
                            setFilter(prev => ({
                                ...prev,
                                from: range?.start ? toJSDate(range.start) : prev.from,
                                to: range?.end ? toJSDate(range.end) : prev.to
                            }));
                        }}
                    />
                    <div className="grid grid-cols-5 gap-1">
                        <Select
                            className="col-span-2"
                            placeholder="Filter By..."
                            variant="bordered"
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0];
                                setFilter(prev => ({
                                    ...prev,
                                    query: key as CustomerServiceFilter["query"]
                                }));


                            }}
                        >
                            {KEY_WORDS.map((option) => (
                                <SelectItem key={option.key}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            className="col-span-2"
                            placeholder="Status..."
                            variant="bordered"
                            disabled={filter.query !== 'status'}
                            onSelectionChange={(keys) => {
                                const key = Array.from(keys)[0];
                                setFilter(prev => ({
                                    ...prev,
                                    status: key as CustomerServiceFilter["status"]
                                }));
                            }}
                        >
                            {STATUS.map((option) => (
                                <SelectItem key={option.key}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Button
                            color="success"
                            onPress={() => setAppliedFilter(filter)}
                        >
                            Apply
                        </Button>
                    </div>

                </div>
            </CardHeader>
            <CardBody className="h-[400px] flex items-center justify-center">
                {isPending && <LoadingSpinner label="Loading.." />}
                {isSuccess && (<ResponsiveContainer width="100%" height="100%">
                    {isStatusType ? (
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
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

                            <Bar dataKey="all" fill="#8884d8" />
                            <Bar dataKey="high" fill="#82ca9d" />
                            <Bar dataKey="medium" fill="#ffc658" />
                            <Bar dataKey="low" fill="#ff8042" />
                        </BarChart>
                    ) : (
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
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
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    )}

                </ResponsiveContainer>)}
            </CardBody>
        </Card>
    );
};

export default CustomerServiceAnalytics;

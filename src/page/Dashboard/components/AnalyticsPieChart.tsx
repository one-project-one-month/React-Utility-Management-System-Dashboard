import type { ReactNode } from "react";
import type { Formatter, NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type PieLabelRenderProps
} from "recharts";

export interface PieDataItem {
    [key: string]: string | number;
}

export interface PieChartProps {
    title: string;
    data: PieDataItem[];
    dataKey: string;
    nameKey: string;
    renderLabel: (props: PieLabelRenderProps) => ReactNode;
    tooltipFormatter?: Formatter<ValueType, NameType>;
    legendFormatter?: (value: string) => string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPieChart = ({
    title,
    data,
    dataKey,
    nameKey,
    renderLabel,
    tooltipFormatter,
    legendFormatter
}: PieChartProps) => {
    return (
        <Card>
            <CardHeader>
                <h3 className="font-semibold">{title}</h3>
            </CardHeader>

            <CardBody className=" flex justify-center items-center">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={dataKey}
                            nameKey={nameKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={renderLabel}
                            isAnimationActive={true}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={tooltipFormatter}
                            contentStyle={{
                                backgroundColor: "rgba(50, 50, 50, 0.9)",
                                border: "1px solid #FFBB28",
                                borderRadius: "8px",
                                padding: "10px"
                            }}
                            labelStyle={{ color: "#fff" }}
                            itemStyle={{ color: "#fff" }}
                        />

                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            formatter={legendFormatter}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

export default AnalyticsPieChart
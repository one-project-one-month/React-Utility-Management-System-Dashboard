import type { ReactNode } from "react"
import AnalyticsPieChart from "./components/AnalyticsPieChart"
import { useFetchRoomAnalytics } from "./hooks/useFetchAnalytics"

const RoomAnalytics = () => {
    const { data: roomAnalytics } = useFetchRoomAnalytics()

    return (
        <AnalyticsPieChart
            title="Room Analytics"
            data={roomAnalytics?.data || []}
            dataKey="count"
            nameKey="status"
            renderLabel={(props) => {
                const { x, y, value } = props;
                return (
                    <text
                        x={x}
                        y={y}
                        fill="#fff"
                        textAnchor="end"
                        dominantBaseline="central"
                        fontSize={14}
                        fontWeight="bold"
                    >
                        {value as ReactNode}
                    </text>
                );
            }}
        />

    )
}

export default RoomAnalytics
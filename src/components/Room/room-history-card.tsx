import {Card, CardBody} from "@heroui/react";
import {format} from "date-fns";

interface RoomHistoryCardProps {
    title: string,
    subTitle: string,
    date: string
}

export function RoomHistoryCard({ title, subTitle, date }: RoomHistoryCardProps) {
    return (
        <Card className="bg-gray-50 dark:bg-gray-800 shadow-none transition-colors">
            <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <div className="flex flex-col gap-1">
                    <h5 className="text-[15px] font-medium text-gray-800 dark:text-gray-100">
                        {title}
                    </h5>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{subTitle} ·</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {format(new Date(date), "dd.MM.yyyy")}
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
import {Card, CardBody} from "@heroui/react";
import * as React from "react";
import {Card, CardBody} from "@heroui/react";

interface RoomCardProps {
    title: string;
    children: React.ReactNode;
}

export function RoomCard({ title, children }: RoomCardProps) {
    return (
        <Card className={"rounded-lg shadow-none"}>
            <CardBody className={"p-6"}>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    {title}
                </h3>
                {children}
            </CardBody>
        </Card>
    )
}
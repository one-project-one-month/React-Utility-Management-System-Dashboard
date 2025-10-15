import type {LucideIcon} from "lucide-react";
import * as React from "react";
import {Card, CardBody} from "@heroui/react";

interface RoomCardProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

export function RoomCard({ title, icon: Icon, children }: RoomCardProps) {
    return (
        <Card className={"rounded-3xl shadow-none"}>
            <CardBody className={"p-6"}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon size={20} className="text-default-500" />
                    {title}
                </h3>
                {children}
            </CardBody>
        </Card>
    )
}
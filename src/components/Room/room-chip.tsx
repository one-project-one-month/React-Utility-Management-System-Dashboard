import {Chip} from "@heroui/react";
import {statusColors, statusLabels} from "@/constants/roomMockData.ts";
import type {Room} from "@/types/room.ts";
import type {LucideIcon} from "lucide-react";

interface RoomChipProps {
    mode: "status" | "property";
    room: Room;
    icon?: LucideIcon;
    propertyKey?: keyof Pick<Room, 'bedrooms' | 'bathrooms' | 'floor' | 'dimension' | 'createdDate' | 'tenant'>
    label?: string;
}

export function RoomChip({ mode, room, icon: Icon, propertyKey, label }: RoomChipProps) {
    if (mode === "status") {
        return (
            <Chip
                size={"sm"}
                variant="flat"
                color="default"
                className="bg-gray-100 text-black space-x-2 p-2"
                startContent={
                    <div className={`w-2 h-2 rounded-full ${statusColors[room.status]}`} />
                }
            >
                {statusLabels[room.status]}
            </Chip>
        )
    }
    return (
        <Chip
            variant={"bordered"}
            startContent={Icon && <Icon size={18} />}
            className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
        >
            <span>{label || (propertyKey ? room[propertyKey] : '')}</span>
        </Chip>
    )
}
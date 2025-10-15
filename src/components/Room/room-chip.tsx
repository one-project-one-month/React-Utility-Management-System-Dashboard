import {Chip} from "@heroui/react";
import {statusColors, statusLabels} from "@/constants/roomMockData.ts";
import type {Room} from "@/types/room.ts";
import type {LucideIcon} from "lucide-react";

interface RoomChipProps {
    mode: "status" | "property";
    room: Room;
    icon?: LucideIcon;
    propertyKey?: keyof Pick<Room, 'noOfBedRoom' | 'floor' | 'dimension'>
    label?: string;
}

export function RoomChip({ mode, room, icon: Icon, propertyKey, label }: RoomChipProps) {
    if (mode === "status") {
        return (
            <Chip
                size={"sm"}
                variant="flat"
                color="default"
                className={statusColors[room.status]}
                radius={"md"}
            >
                {statusLabels[room.status]}
            </Chip>
        )
    }
    return (
        <Chip
            variant={"bordered"}
            startContent={Icon && <Icon size={14} />}
            className={"flex items-center space-x-1 border-1 border-gray-300/40 rounded-lg px-2"}
        >
            <span className="text-xs">{label || (propertyKey ? room[propertyKey] : '')}</span>
        </Chip>
    )
}
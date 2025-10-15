import type {Room} from "@/types/room.ts";
import { Button, Card, CardBody, type PressEvent } from "@heroui/react";
import {RoomChip} from "@/components/Room/room-chip.tsx";
import {Bed, Layers, Maximize2, Pencil, Trash2} from "lucide-react";

interface RoomCardProps {
    room: Room;
    onCardClick: (roomId: string) => void;
    onEdit: (roomId: string) => void;
    onDelete: (roomId: string) => void;
}

export function RoomListCard({ room, onCardClick, onEdit, onDelete }: RoomCardProps) {
    const handleCardClick = () => {
        if (room.id) {
            onCardClick(room.id)
        }
    }

    const handleEdit = (e: PressEvent) => {
        e.continuePropagation();
        if (room.id) {
            onEdit(room.id);
        }
    }

    const handleDelete = (e: PressEvent) => {
        e.continuePropagation();
        if (room.id) {
            onDelete(room.id);
        }
    }

    return (
        <Card className="w-full rounded-lg shadow-none cursor-pointer transition-colors">
            <CardBody className={"p-3"}>
                <div className="flex flex-col md:flex-row gap-4 p-3">
                    <div
                        onPointerDown={handleCardClick}
                        className="flex-1 flex flex-col justify-center gap-3 cursor-pointer"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold">Room {room.roomNo}</h3>
                                <RoomChip mode="status" room={room} />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-default-600">
                            <RoomChip
                                mode={"property"}
                                room={room}
                                icon={Bed}
                                label={`${room.noOfBedRoom} Bedroom`}
                            />
                            <RoomChip
                                mode={"property"}
                                room={room}
                                icon={Layers}
                                label={`Floor No ${room.floor}`}
                            />
                            <RoomChip
                                mode={"property"}
                                room={room}
                                icon={Maximize2}
                                label={`${room.dimension} sq m Area`}
                            />
                        </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:min-w-fit">
                        <div className="text-lg font-semibold">
                            MMK {room.sellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onPress={handleEdit}
                                isIconOnly
                                variant="light"
                                color="default"
                                aria-label="Edit property"
                            >
                                <Pencil size={20} className="text-default-500" />
                            </Button>
                            <Button
                                onPress={handleDelete}
                                isIconOnly
                                variant="light"
                                color="danger"
                                aria-label="Delete property"
                            >
                                <Trash2 size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
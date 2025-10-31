import type {Room} from "@/types/room.ts";
import { Button, Card, CardBody, type PressEvent } from "@heroui/react";
import {RoomChip} from "@/components/Room/room-chip.tsx";
import {Bed, Layers, Maximize2, Pencil, User, UserX} from "lucide-react";
import {formatCurrency} from "@/utils/roomFormat.ts";

interface RoomCardProps {
    room: Room;
    onCardClick: (roomId: string) => void;
    onEdit: (roomId: string) => void;
}

export function RoomListCard({ room, onCardClick, onEdit }: RoomCardProps) {

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

    return (
        <div>
            <Card className="w-full rounded-2xl shadow-none cursor-pointer transition-all duration-200 hover:bg-default-50 hover:shadow-md hover:scale-[1.002]">
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
                                    label={`${room.dimension}`}
                                />
                                {["Rented", "Purchased"].includes(room.status) && (
                                    <RoomChip
                                        mode={"property"}
                                        room={room}
                                        icon={room.tenant == undefined ? UserX : User}
                                        label={`${room.tenant?.name ?? "No Tenant"}`}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:min-w-fit">
                            <div className="text-lg font-semibold">
                                {formatCurrency(room.sellingPrice)} MMK
                            </div>

                            <Button
                                onPress={handleEdit}
                                isIconOnly
                                variant="light"
                                color="primary"
                            >
                                <Pencil size={20} className="text-primary" />
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
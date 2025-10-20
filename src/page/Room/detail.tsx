import {
    Pencil,
} from "lucide-react";
import {Button} from "@heroui/react";
import {useNavigate, useParams} from "react-router";
import {RoomChip} from "@/components/Room/room-chip.tsx";
import {roomMockData} from "@/constants/roomMockData.ts";
import { InfoRow } from "@/components/common/info-row.tsx";
import {RoomCard} from "@/components/Room/room-card.tsx";
import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";

function formatCurrency(amount: number, currency = "MMK") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
}

export default function RoomDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const room = roomMockData.find(r => r.id === id);

    if (!room) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-medium mb-4">Room Not Found</h1>
                    <Button onPress={() => navigate('/rooms')}>
                        Back to Rooms
                    </Button>
                </div>
            </div>
        )
    }

    const handleEditRoom = () => {
        navigate(`/rooms/${id}/edit`)
    }

    return (
        <div className={"p-2 space-y-4"}>
            <NavigationBreadCrumbs items={breadcrumbs.roomDetail} />
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div className={"flex items-center gap-2"}>
                    <h1 className={"text-2xl font-medium"}>Room {room.roomNo}</h1>
                    <RoomChip mode={"status"} room={room} />
                </div>

                <div>
                    <Button
                        onPress={handleEditRoom}
                        variant={"bordered"}
                        className={"border-[0.5px] bg-white text-primary dark:bg-transparent"}
                        startContent={<Pencil size={16} />}
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <div className={"space-y-2 pb-12"}>
                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                    <RoomCard title={"Description"}>
                        <p className="text-default-600 leading-relaxed">{room.description}</p>
                    </RoomCard>
                    
                    <RoomCard title={"Room Information"}>
                        <InfoRow label={"Row Number"} value={room.roomNo} />
                        <InfoRow label={"BedRooms"} value={room.noOfBedRoom} />
                        <InfoRow label={"Floor"} value={room.floor} />
                        <InfoRow label={"Dimension"} value={`${room.dimension} sq m Area`} />
                        <InfoRow label={"Max Occupancy"} value={`${room.maxNoPeople} People`} />
                        <InfoRow label={"Monthly Rent Fee"} value={formatCurrency(room.sellingPrice)} valueClassName={"text-lg text-primary"} />
                    </RoomCard>
                </div>
            </div>
        </div>
    )
}
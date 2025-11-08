import {
    Pencil,
} from "lucide-react";
import {Button, Tooltip} from "@heroui/react";
import {useNavigate, useParams} from "react-router";
import {RoomChip} from "@/components/Room/room-chip.tsx";
import { InfoRow } from "@/components/common/info-row.tsx";
import {RoomCard} from "@/components/Room/room-card.tsx";
import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {formatContractDuration, formatCurrency} from "@/utils/roomFormat.ts";
import {Tab, Tabs} from "@heroui/tabs";
import type {Bill, CustomerService} from "@/types/room.ts";
import {RoomHistoryCard} from "@/components/Room/room-history-card.tsx";
import {EmptyState} from "@/components/common/empty-state.tsx";
import {useFetchRoom} from "@/hooks/useRooms.ts";
import {SkeletonLoader} from "@/components/skeleton-loader.tsx";

export default function RoomDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: room, isLoading } = useFetchRoom(id!);
    console.log(room);

    if (isLoading) {
        return (
            <div className={"h-[84vh] p-2 space-y-4 overflow-y-auto custom-scrollbar-3 pb-6"}>
                <NavigationBreadCrumbs items={breadcrumbs.roomDetail} />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <SkeletonLoader height="2rem" width="10rem" />
                        <SkeletonLoader height="1.5rem" width="5rem" />
                    </div>
                    <SkeletonLoader height="2.5rem" width="2.5rem" />
                </div>

                <div className={"space-y-6"}>
                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                        <SkeletonLoader height="10rem" />
                        <SkeletonLoader height="15rem" />
                    </div>

                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                        <SkeletonLoader height="15rem" />
                        <SkeletonLoader height="20rem" />
                    </div>
                </div>
            </div>
        );
    }

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
        <div className={"h-[84vh] p-2 space-y-4 overflow-y-auto custom-scrollbar-3 pb-6"}>
            <NavigationBreadCrumbs items={breadcrumbs.roomDetail} />
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div className={"flex items-center gap-2"}>
                    <h1 className={"text-2xl font-medium"}>Room {room.roomNo}</h1>
                    <RoomChip mode={"status"} room={room} />
                </div>

                <div>
                    <Tooltip content="Edit user">
                        <Button
                            isIconOnly
                            onPress={handleEditRoom}
                            variant={"light"}
                            color={"primary"}
                        >
                            <Pencil size={24} className={"text-primary"} />
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <div className={"space-y-6"}>
                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                    <RoomCard title={"Room Description"}>
                        <p className="text-default-600 leading-relaxed">{room.description}</p>
                    </RoomCard>

                    <RoomCard title={"Room Information"}>
                        <InfoRow label={"Row Number"} value={room.roomNo} />
                        <InfoRow label={"BedRooms"} value={room.noOfBedRoom} />
                        <InfoRow label={"Floor No"} value={room.floor} />
                        <InfoRow label={"Dimension"} value={`${room.dimension}`} />
                        <InfoRow label={"Max Occupancy"} value={`${room.maxNoOfPeople} People`} />
                        <InfoRow label={"Rent Fee"} value={`${formatCurrency(room.sellingPrice)} MMK`} valueClassName={"text-lg text-primary"} />
                    </RoomCard>
                </div>

                {["Rented", "Purchased"].includes(room.status) && room.tenant ? (
                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                        <RoomCard title={"Tenant Information"}>
                            <InfoRow label={"Full Name"} value={room.tenant.name} />
                            <InfoRow label={"Email"} value={room.tenant.email} />
                            <InfoRow label={"NRC"} value={room.tenant.nrc} />
                            <InfoRow label={"Ph Number"} value={room.tenant.phoneNo} />
                            {room.status == "Rented" && <InfoRow label={"Contract"} value={formatContractDuration(room.contract[0].createdDate, room.contract[0].expiryDate)} />}
                            <InfoRow label={"Emergency Contact"} value={room.tenant.emergencyNo} />
                        </RoomCard>

                        <RoomCard title={"Room History"}>
                            <Tabs color={"primary"} aria-label="Options" fullWidth>
                                <Tab key={"Services History"} title={"Services History"} className={"space-y-4"}>
                                    <div className={"max-h-48 overflow-y-auto space-y-4 pr-2"}>
                                        {room.customerService.length > 0 ? (
                                            room.customerService.map((service: CustomerService) => (
                                                <RoomHistoryCard
                                                    key={service.id}
                                                    title={service.description}
                                                    subTitle={service.category}
                                                    date={service.issuedDate}
                                                />
                                            ))
                                        ) : (
                                            <EmptyState />
                                        )}
                                    </div>

                                </Tab>
                                <Tab key={"Utility Unit History"} title={"Utility Unit History"}>
                                    <div className={"max-h-48 overflow-y-auto space-y-4 pr-2"}>
                                        {room.bill.length > 0 ? (
                                            room.bill.map((bill: Bill) => (
                                                <RoomHistoryCard
                                                    key={bill.id}
                                                    title={"Total Utility Unit"}
                                                    subTitle={`${formatCurrency(bill.totalAmount)} MMK`}
                                                    date={bill.dueDate}
                                                />
                                            ))
                                        ) : (
                                            <EmptyState />
                                        )}
                                    </div>
                                </Tab>
                                <Tab key={"Contract History"} title={"Contract History"}>
                                    <div className={"max-h-48 overflow-y-auto space-y-4 pr-2"}>
                                        {room.contract.length > 0 ? (
                                            room.contract.map((contract) => (
                                                <RoomHistoryCard
                                                    key={contract.id}
                                                    title={"Contract Renewed"}
                                                    subTitle={formatContractDuration(contract.createdDate, contract.expiryDate)}
                                                    date={contract.createdDate}
                                                />
                                            ))
                                        ) : (
                                            <EmptyState />
                                        )}
                                    </div>
                                </Tab>
                            </Tabs>
                        </RoomCard>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RoomCard title="Tenant Information">
                            <EmptyState />
                        </RoomCard>

                        <RoomCard title="Room History">
                            <EmptyState />
                        </RoomCard>
                    </div>
                )}
            </div>
        </div>
    )
}
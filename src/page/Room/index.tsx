import { useState } from "react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {
    Filter,
    Search,
    Upload,
} from "lucide-react";
import {useNavigate} from "react-router";
import type {Room} from "@/types/room.ts";
import {roomMockData} from "@/constants/roomMockData";
import {useFilteredRooms} from "@/hooks/useFilteredRooms.ts";
import {RoomFilterSelect} from "@/components/Room/room-filter-select.tsx";
import {RoomListCard} from "@/components/Room/room-list-card.tsx";

const FILTER_OPTIONS = {
    bedrooms: ["1", "2", "3"] as string[],
    bathrooms: ["1", "2", "3"] as string[],
    floor: ["1", "2", "3", "4", "5 max"] as string[],
    status: ["all", "available", "rented", "purchased", "maintenance"] as string[],
    price: ["150000", "200000", "250000", "300000"] as string[],
};

const INIT_FILTERS = {
    bedrooms: "",
    bathrooms: "",
    floor: "",
    status: "all",
    price: "",
}

export default function RoomPage() {
    const navigate = useNavigate();
    const [rooms] = useState<Room[]>(roomMockData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState(INIT_FILTERS);

    const handleViewRoom = (roomId: string) => {
        navigate(`/room/${roomId}`);
    }

    const handleEditRoom = (roomId: string) => {
        navigate(`/room/${roomId}/edit`);
    };

    const handleDeleteRoom = (roomId: string) => {
        console.log('Delete room:', roomId);
    };

    const filteredAndSortedRooms = useFilteredRooms(rooms, searchTerm, filters);

    const handleResetFilters = () => {
        setSearchTerm("");
        setFilters(INIT_FILTERS);
    }

    return (
        <div className="p-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    placeholder="Search"
                    variant="bordered"
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    startContent={<Search size={18} className="text-default-400" />}
                    classNames={{
                        base: "flex-1",
                        inputWrapper: "border-[0.5px]"
                    }}
                />
                <div className="grid grid-cols-2 sm:flex gap-2">
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<Filter size={16} className={"stroke-primary fill-primary"} />}
                        className="w-full sm:w-auto border-1 border-primary"
                        onPress={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<Upload size={16} />}
                        className="w-full sm:w-auto border-[0.5px]"
                    >
                        Export to CSV
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 flex-1">
                    <RoomFilterSelect
                        label={"Bedrooms"}
                        options={FILTER_OPTIONS.bedrooms}
                        value={filters.bedrooms}
                        onChange={(val) => setFilters((prev) => ({ ...prev, bedrooms: val }))}
                    />
                    <RoomFilterSelect
                        label={"Bathrooms"}
                        options={FILTER_OPTIONS.bathrooms}
                        value={filters.bathrooms}
                        onChange={(val) => setFilters((prev) => ({ ...prev, bathrooms: val }))}
                    />
                    <RoomFilterSelect
                        label={"Floor"}
                        options={FILTER_OPTIONS.floor}
                        value={filters.floor}
                        onChange={(val) => setFilters((prev) => ({ ...prev, floor: val }))}
                    />
                    <RoomFilterSelect
                        label={"Status"}
                        options={FILTER_OPTIONS.status}
                        value={filters.status}
                        onChange={(val) => setFilters((prev) => ({ ...prev, status: val }))}
                    />
                    <RoomFilterSelect
                        label={"price"}
                        options={FILTER_OPTIONS.price}
                        value={filters.price}
                        onChange={(val) => setFilters((prev) => ({ ...prev, price: val }))}
                    />
                </div>
            </div>

            <div className="bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-4">
                <h3 className="text-lg font-medium">
                    Rooms: <span className="text-gray-400">{filteredAndSortedRooms.length}</span>
                </h3>

                <div className="space-y-4">
                    {filteredAndSortedRooms.map((room) => (
                        <RoomListCard
                            key={room.id}
                            room={room}
                            onCardClick={handleViewRoom}
                            onEdit={handleEditRoom}
                            onDelete={handleDeleteRoom}
                        />
                    ))}
                    {filteredAndSortedRooms.length === 0 && (
                        <div className="text-center p-6 text-gray-200">
                            No rooms found matching the current filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

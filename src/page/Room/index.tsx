import { useState } from "react";
import {Button} from "@heroui/react";
import {
    Filter,
    Upload,
} from "lucide-react";
import {useNavigate} from "react-router";
import type {Room} from "@/types/room.ts";
import {roomMockData} from "@/constants/roomMockData";
import {useFilteredRooms} from "@/hooks/useFilteredRooms.ts";
import {RoomListCard} from "@/components/Room/room-list-card.tsx";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import {FilterAutocomplete} from "@/components/common/filter-autocomplete.tsx";
import {SearchInput} from "@/components/common/search-input.tsx";

const FILTER_OPTIONS = {
    noOfBedRoom: ["1", "2", "3", "4", "5"],
    floor: ["1", "2", "3", "4", "5"],
    status: ["all", "available", "rented", "purchased", "maintenance"],
    sellingPrice: ["150000", "200000", "250000", "300000"],
};

const INIT_FILTERS = {
    noOfBedRoom: "",
    floor: "",
    status: "all",
    sellingPrice: "",
}

export default function RoomPage() {
    const navigate = useNavigate();
    const [rooms] = useState<Room[]>(roomMockData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState(INIT_FILTERS);

    const handleViewRoom = (roomId: string) => {
        navigate(`/rooms/${roomId}`);
    }

    const handleEditRoom = (roomId: string) => {
        navigate(`/rooms/${roomId}/edit`);
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
        <div className="p-4 space-y-4">
            <NavigationBreadCrumbs items={breadcrumbs.roomList} />
            <div className="flex flex-col sm:flex-row gap-2">
                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                    <FilterAutocomplete
                        label={"Select bedroom"}
                        options={FILTER_OPTIONS.noOfBedRoom}
                        value={filters.noOfBedRoom}
                        onChange={(value) => setFilters((prev) => ({ ...prev, noOfBedRoom: value }))}
                    />
                    <FilterAutocomplete
                        label={"Select floor"}
                        options={FILTER_OPTIONS.floor}
                        value={filters.floor}
                        onChange={(value) => setFilters((prev) => ({ ...prev, floor: value }))}
                    />
                    <FilterAutocomplete
                        label={"Select status"}
                        options={FILTER_OPTIONS.status}
                        value={filters.status}
                        onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                    />
                    <FilterAutocomplete
                        label={"Select price"}
                        options={FILTER_OPTIONS.sellingPrice}
                        value={filters.sellingPrice}
                        onChange={(value) => setFilters((prev) => ({ ...prev, sellingPrice: value }))}
                    />
                </div>
            </div>

            <div className="space-y-4 pb-12">
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
                    <div className="text-center p-6 text-gray-500">
                        No rooms found matching the current filters.
                    </div>
                )}
            </div>
        </div>
    )
}

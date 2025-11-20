import {Button, Pagination} from "@heroui/react";
import {
    Filter, Plus,
} from "lucide-react";
import {useNavigate} from "react-router";
import {type Room} from "@/types/room.ts";
import {RoomListCard} from "@/components/Room/room-list-card.tsx";
import {FilterAutocomplete} from "@/components/common/filter-autocomplete.tsx";
import {SearchInput} from "@/components/common/search-input.tsx";
import { useFetchRooms } from "@/hooks/useRooms.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb";
import { breadcrumbs } from "@/constants/breadcrumbs";
import { useState } from "react";
import type { Pagination as PaginationType } from "@/types/pagination";
import {SkeletonLoader} from "@/components/skeleton-loader.tsx";

const filterOptions = {
    noOfBedRoom: ["1", "2", "3", "4", "5"],
    floor: ["1", "2", "3", "4", "5"],
    status: ["all", "available", "rented", "purchased", "maintenance"],
    sellingPrice: ["150000", "200000", "250000", "300000"],
};

const initialFilters = {
    noOfBedRoom: "",
    floor: "",
    status: "all",
    sellingPrice: "",
}

export default function RoomPage() {
    const navigate = useNavigate();

    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        limit: 10,
        // filter: {
        //     status: RoomAvailability.AVAILABLE
        // }
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState(initialFilters);

    const { data: roomsData, isLoading } = useFetchRooms(pagination);
    const rooms = roomsData?.data || [];
    const meta = roomsData?.meta;
    const totalPages = meta?.lastPage || 1;

    const handleViewRoom = (roomId: string) => {
        navigate(`/rooms/${roomId}`);
    }

    const handleCreateRoom = () => {
        navigate(`/rooms/create`);
    }

    const handleEditRoom = (roomId: string) => {
        navigate(`/rooms/${roomId}/edit`);
    }

    const handleResetFilters = () => {
        setSearchTerm("");
        setFilters(initialFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
    }

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
        scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="h-[84vh] p-2 space-y-4 overflow-y-auto custom-scrollbar-3 pb-6">
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
                        color="primary"
                        variant="solid"
                        startContent={<Plus />}
                        onPress={handleCreateRoom}
                    >
                        Create New Room
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 flex-1">
                    <FilterAutocomplete
                        label={"Select bedroom"}
                        options={filterOptions.noOfBedRoom}
                        value={filters.noOfBedRoom}
                        onChange={(value) => setFilters((prev) => ({ ...prev, noOfBedRoom: value }))}
                    />
                    <FilterAutocomplete
                        label={"Select floor"}
                        options={filterOptions.floor}
                        value={filters.floor}
                        onChange={(value) => setFilters((prev) => ({ ...prev, floor: value }))}
                    />
                    <FilterAutocomplete
                        label={"Select status"}
                        options={filterOptions.status}
                        value={filters.status}
                        onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                    />
                    <FilterAutocomplete
                        label={"Select price"}
                        options={filterOptions.sellingPrice}
                        value={filters.sellingPrice}
                        onChange={(value) => setFilters((prev) => ({ ...prev, sellingPrice: value }))}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(pagination.limit)].map((_, i) => (
                        <SkeletonLoader key={i} height="8rem" rounded={"rounded-2xl"} />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {rooms.map((room: Room) => (
                        <RoomListCard
                            key={room.id}
                            room={room}
                            onCardClick={handleViewRoom}
                            onEdit={handleEditRoom}
                        />
                    ))}
                    {rooms.length === 0 && (
                        <div className="text-center p-6 text-gray-500">
                            No rooms found matching the current filters.
                        </div>
                    )}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    className="flex w-full justify-center"
                    color="primary"
                    page={pagination.page}
                    total={totalPages}
                    onChange={handlePageChange}
                />
            )}
        </div>
    )
}
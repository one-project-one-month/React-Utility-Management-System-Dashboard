import { Button, Pagination } from "@heroui/react";
import {
    Filter, Plus,
} from "lucide-react";
import { useNavigate } from "react-router";
import { type Room } from "@/types/room.ts";
import { RoomListCard } from "@/components/Room/room-list-card.tsx";
import { FilterAutocomplete } from "@/components/common/filter-autocomplete.tsx";
import { SearchInput } from "@/components/common/search-input.tsx";
import { useFetchRooms } from "@/hooks/useRooms.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb";
import { breadcrumbs } from "@/constants/breadcrumbs";
import { useDeferredValue, useEffect, useState } from "react";
import type { Pagination as PaginationType } from "@/types/pagination";
import { SkeletonLoader } from "@/components/skeleton-loader.tsx";
import { cn } from "@/lib/utils";

const filterOptions = {
    floor: ["1", "2", "3", "4", "5"],
    status: ["All", "Available", "Rented", "Purchased", "InMaintenance"],
};

const initialFilters = {
    roomNo: undefined,
    floor: "",
    status: "All",
}

export default function RoomPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState(initialFilters);

    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        limit: 10,
        filter: {
            floor: filters.floor || undefined,
            status: filters.status !== "All" ? filters.status : undefined,
            roomNo: searchTerm || undefined,
        }
    });

    const deferredPagination = useDeferredValue(pagination);
    const isStale = pagination !== deferredPagination;

    console.log('checking for stale condition', isStale);

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            page: 1, // Reset to page 1 when filters change
            filter: {
                floor: filters.floor || undefined,
                status: filters.status !== "All" ? filters.status : undefined,
                roomNo: searchTerm || undefined,
            }
        }));
    }, [filters.floor, filters.status, searchTerm]);

    // Use deferredPagination here instead of pagination
    const { data: roomsData, isFetching } = useFetchRooms(deferredPagination);
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
            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                    <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div className="grid grid-cols-2 sm:flex gap-2 sm:flex-shrink-0">
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

                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2">
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
                </div>
            </div>

            <div className={cn(
                "relative transition-opacity duration-200",
                isStale ? "opacity-30 pointer-events-none delay-200" : "opacity-100 delay-0"
            )}>
                {/* Loading overlay for better visual feedback */}
                {(isStale || isFetching) && (
                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}


                {isFetching && !roomsData ? (
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
            </div>

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
import type {Room} from "@/types/room.ts";
import {useMemo} from "react";

export type Filters = {
    bedrooms: string;
    bathrooms: string;
    floor: string;
    status: string;
    price: string;
}

export function useFilteredRooms(rooms: Room[], searchTerm: string, filters: Filters) {
    return useMemo(() => {
        return rooms.filter((room) => {
            const checks = [
                !searchTerm ||
                    room.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    room.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    room.tenant.toLowerCase().includes(searchTerm.toLowerCase()),

                !filters.bedrooms || room.bedrooms === Number(filters.bedrooms),
                !filters.bathrooms || room.bathrooms === Number(filters.bathrooms),
                !filters.floor || room.floor === Number(filters.floor),
                filters.status === "all" || room.status === filters.status,
                !filters.price || room.price <= Number(filters.price),
            ];

            return checks.every(Boolean);
        }).sort((a, b) => a.roomNo.localeCompare(b.roomNo));
    }, [rooms, searchTerm, filters]);
}
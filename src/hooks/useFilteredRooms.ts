import type {Room} from "@/types/room.ts";
import {useMemo} from "react";

export type Filters = {
    noOfBedRoom: string;
    floor: string;
    status: string;
    sellingPrice: string;
}

export function useFilteredRooms(rooms: Room[], searchTerm: string, filters: Filters) {
    return useMemo(() => {
        return rooms.filter((room) => {
            const searchLower = searchTerm.toLowerCase().trim();

            const roomNumberStr = room.roomNo.toString();
            const roomWithPrefix = `room ${roomNumberStr}`;

            const search = !searchLower ||
                roomNumberStr.includes(searchTerm) ||
                roomWithPrefix.includes(searchLower) ||
                room.status.toLowerCase().includes(searchLower);

            const bedroom = !filters.noOfBedRoom ||
                room.noOfBedRoom === Number(filters.noOfBedRoom);

            const floor = !filters.floor ||
                room.floor === Number(filters.floor);

            const status = !filters.status ||
                filters.status === "all" ||
                room.status === filters.status;

            const price = !filters.sellingPrice ||
                room.sellingPrice <= Number(filters.sellingPrice);

            return search && bedroom && floor && status && price;
        }).sort((a, b) => a.roomNo - b.roomNo);
    }, [rooms, searchTerm, filters]);
}
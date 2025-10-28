import type { Room } from "@/types/room";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "./apiResponse";
import type { Pagination } from "@/types/pagination";
import { buildQueryParams } from "./utils";

export const fetchAllRooms = async(pagination: Pagination) => {
    const query = buildQueryParams(pagination);
    const res = await axiosInstance.get<ApiResponse<Room>>(`/rooms?${query}`);

    return res.data;
}


import type {CreateRoomFormData, EditRoomFormData, Room} from "@/types/room";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "./apiResponse";
import type { Pagination } from "@/types/pagination";
import { buildQueryParams } from "./utils";

export const fetchRooms = async(pagination: Pagination) => {
    const query = buildQueryParams(pagination);
    const res = await axiosInstance.get<ApiResponse<Room[]>>(`/rooms?${query}`);

    return {
        data: res.data.content.data,
        meta: res.data.content.meta,
        links: res.data.content.links
    };
}

export const fetchRoom = async (id: string) => {
    const res = await axiosInstance.get<ApiResponse<Room>>(`/rooms/${id}`);

    return res.data.content.data;
}

export const createRoom = async (formData: CreateRoomFormData) => {
    const res = await axiosInstance.post<ApiResponse<CreateRoomFormData>>('/rooms', formData);

    return res.data;
}

export const editRoom = async (id: string, formData: EditRoomFormData) => {
    const res = await axiosInstance.put<ApiResponse<EditRoomFormData>>(`/rooms/${id}`, formData);

    return res.data;
}
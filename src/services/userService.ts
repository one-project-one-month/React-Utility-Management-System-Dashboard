import type {CreateUserFormData, EditUserFormData, User} from "@/types/user.ts";
import axiosInstance from "@/services/axiosInstance.ts";
import type {Pagination} from "@/types/pagination.ts";
import {buildQueryParams} from "@/services/utils";
import type {ApiResponse} from "@/services/apiResponse.ts";

export const fetchUsers = async (pagination: Pagination) => {
    const query = buildQueryParams(pagination);
    const res = await axiosInstance.get<ApiResponse<User[]>>(`/users?${query}`);

    return {
        data: res.data.content.data,
        meta: res.data.content.meta,
        links: res.data.content.links
    }
}

export const  fetchUser = async (id: string) => {
    const res = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);

    return res.data.content.data;
}

// Replace this temporary logic with fetchTenants() when it's ready
export const fetchTenants = async () => {
    const res = await axiosInstance.get("/tenants");

    return res.data.content.data;
}

export const createUser = async (formData: CreateUserFormData) => {
    const res = await axiosInstance.post<ApiResponse<CreateUserFormData>>("/users", formData);
    
    return res.data;
}

export const editUser = async (id: string, formData: EditUserFormData) => {
    const res = await axiosInstance.put<ApiResponse<EditUserFormData>>(`/users/${id}`, formData);

    return res.data;
}

export const deleteUser = async (id: string) => {
    const res = await axiosInstance.delete(`/users/${id}`);

    return res.data;
}
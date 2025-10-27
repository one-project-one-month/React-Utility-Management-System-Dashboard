import type {CreateUserFormData, EditUserFormData} from "@/types/user.ts";
import axiosInstance from "@/services/axiosInstance.ts";

async function fetchUsers() {
    const res = await axiosInstance.get("/users");
    return res.data.content.data;
}

async function fetchUser(id: string) {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data.content.data;
}

async function fetchTenants() {
    const res = await axiosInstance.get("/tenants");
    return res.data.content.data;
}

async function createUser(formData: CreateUserFormData) {
    const res = await axiosInstance.post("/users", formData);
    return res.data;
}

async function editUser(id: string, formData: EditUserFormData) {
    const res = await axiosInstance.put(`/users/${id}`, formData);
    return res.data;
}

async function deleteUser(id: string) {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
}

export const userService = {
    fetchUsers,
    fetchUser,
    fetchTenants,
    createUser,
    editUser,
    deleteUser
}
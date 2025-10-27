import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {
    CreateUserFormData,
    CreateUserResponse,
    DeleteUserResponse,
    EditUserFormData,
    EditUserResponse
} from "@/types/user.ts";
import {userService} from "@/services/userService.ts";
import {addToast} from "@heroui/react";
import type {AxiosError} from "axios";
import {useNavigate} from "react-router";

export function useFetchUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => userService.fetchUsers(),
        staleTime: 30000
    });
}

export function useFetchUser(id: string) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => userService.fetchUser(id),
        staleTime: 30000,
        enabled: !!id
    });
}

export function useFetchTenants() {
    return useQuery({
        queryKey: ["tenants"],
        queryFn: () => userService.fetchTenants()
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation<
        CreateUserResponse,
        AxiosError<{ message: string }>,
        CreateUserFormData
    >({
        mutationFn: (formData: CreateUserFormData) => userService.createUser(formData),
        onSuccess: async (data) => {
            await queryClient.refetchQueries({ queryKey: ["users"] });
            addToast({
                title: data.message,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
            });
        },
        onError: (error) => {
            addToast({
                title: error.response?.data.message || "Failed to create user",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
                variant: "flat",
            })
        }
    });
}

export function useEditUser() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<
        EditUserResponse,
        AxiosError<{ message: string }>,
        { id: string, formData: EditUserFormData }
    >({
        mutationFn: ({ id, formData }) => userService.editUser(id, formData),
        onSuccess: async (data, variables) => {
            await queryClient.refetchQueries({ queryKey: ["users"] });
            await queryClient.invalidateQueries({ queryKey: ["users", variables.id] })

            addToast({
                title: data.message,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
            });
            navigate("/user-management/users");
        },
        onError: (error) => {
            addToast({
                title: error.response?.data.message || "Failed to edit user",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
                variant: "flat",
            })
        }
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation<
        DeleteUserResponse,
        AxiosError<{ message: string }>,
        string
    >({
        mutationFn: (id) => userService.deleteUser(id),
        onSuccess: async (data) => {
            await queryClient.refetchQueries({ queryKey: ["users"] });

            addToast({
                title: data.message,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
            });
        },
        onError: (error) => {
            addToast({
                title: error.response?.data.message || "Failed to delete user",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
                variant: "flat",
            })
        }
    })
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateUserFormData, EditUserFormData, User } from "@/types/user.ts";
import {
   createUser,
   deleteUser,
   editUser,
   fetchTenants,
   fetchUser,
   fetchUsers,
} from "@/services/userService.ts";
import { addToast } from "@heroui/react";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import type { Pagination } from "@/types/pagination.ts";
import type { ApiResponse } from "@/services/apiResponse.ts";

export const useFetchUsers = (pagination: Pagination) => {
   return useQuery({
      queryKey: ["users", pagination],
      queryFn: () => fetchUsers(pagination),
   });
};

export const useFetchUser = (id: string) => {
   return useQuery({
      queryKey: ["users", id],
      queryFn: () => fetchUser(id),
      enabled: !!id,
   });
};

export const useFetchTenants = () => {
   return useQuery({
      queryKey: ["tenants"],
      queryFn: () => fetchTenants(),
   });
};

export const useCreateUser = () => {
   const queryClient = useQueryClient();

   return useMutation<
      ApiResponse<CreateUserFormData>,
      AxiosError<{ message: string }>,
      CreateUserFormData
   >({
      mutationFn: (formData: CreateUserFormData) => createUser(formData),
      onSuccess: async data => {
         await queryClient.invalidateQueries({ queryKey: ["users"] });
         await queryClient.refetchQueries({ queryKey: ["users"] });

         addToast({
            title: data.message,
            color: "success",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });
      },
      onError: error => {
         addToast({
            title: error.response?.data.message || "Failed to create user",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
            variant: "flat",
         });
      },
   });
};

export const useEditUser = () => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   return useMutation<
      ApiResponse<EditUserFormData>,
      AxiosError<{ message: string }>,
      { id: string; formData: EditUserFormData }
   >({
      mutationFn: ({ id, formData }) => editUser(id, formData),
      onSuccess: async (data, variables) => {
         await queryClient.refetchQueries({ queryKey: ["users"] });
         await queryClient.invalidateQueries({ queryKey: ["users", variables.id] });

         addToast({
            title: data.message,
            color: "success",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });
         navigate("/user-management/users");
      },
      onError: error => {
         addToast({
            title: error.response?.data.message || "Failed to edit user",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
            variant: "flat",
         });
      },
   });
};

export const useDeleteUser = () => {
   const queryClient = useQueryClient();

   return useMutation<ApiResponse<User>, AxiosError<{ message: string }>, string>({
      mutationFn: id => deleteUser(id),
      onSuccess: async data => {
         await queryClient.refetchQueries({ queryKey: ["users"] });

         addToast({
            title: data.message,
            color: "success",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });
      },
      onError: error => {
         addToast({
            title: error.response?.data.message || "Failed to delete user",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
            variant: "flat",
         });
      },
   });
};

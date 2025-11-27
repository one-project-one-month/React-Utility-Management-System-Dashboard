import { createRoom, editRoom, fetchRooms, fetchRoom } from "@/services/roomService";
import type { Pagination } from "@/types/pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ApiResponse } from "@/services/apiResponse.ts";
import type { CreateRoomFormData, EditRoomFormData } from "@/types/room.ts";
import type { AxiosError } from "axios";
import { addToast } from "@heroui/react";

export const useFetchRooms = (pagination: Pagination) => {
    return useQuery({
        queryKey: ['rooms', pagination],
        queryFn: () => fetchRooms(pagination),
        placeholderData: (previousData) => previousData,
    });
}

export const useFetchRoom = (id: string) => {
   return useQuery({
      queryKey: ["rooms", id],
      queryFn: () => fetchRoom(id),
      enabled: !!id,
   });
};

export const useCreateRoom = () => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   return useMutation<
      ApiResponse<CreateRoomFormData>,
      AxiosError<{ message: string }>,
      CreateRoomFormData
   >({
      mutationFn: formData => createRoom(formData),
      onSuccess: data => {
         queryClient.invalidateQueries({ queryKey: ["rooms"] });

         addToast({
            title: data.message,
            color: "success",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });

         navigate("/rooms");
      },
      onError: error => {
         addToast({
            title: error.message || "Failed to create room",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
            variant: "flat",
         });
      },
   });
};

export const useEditRoom = () => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   return useMutation<
      ApiResponse<EditRoomFormData>,
      AxiosError<{ message: string }>,
      { id: string; formData: EditRoomFormData }
   >({
      mutationFn: ({ id, formData }) => editRoom(id, formData),
      onSuccess: async (data, variables) => {
         await queryClient.invalidateQueries({ queryKey: ["rooms"] });
         await queryClient.refetchQueries({ queryKey: ["rooms"] });

         await queryClient.invalidateQueries({ queryKey: ["rooms", variables.id] });
         await queryClient.refetchQueries({ queryKey: ["rooms", variables.id] });

         addToast({
            title: data.message,
            color: "success",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });

         navigate("/rooms");
      },
      onError: error => {
         addToast({
            title: error.response?.data.message || "Failed to edit room",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
            variant: "flat",
         });
      },
   });
};

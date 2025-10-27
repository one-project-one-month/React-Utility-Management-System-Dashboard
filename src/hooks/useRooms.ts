import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {roomService} from "@/services/roomService.ts";
import type {CreateRoomFormData, CreateRoomResponse, EditRoomFormData, EditRoomResponse, Room} from "@/types/room.ts";
import type {AxiosError} from "axios";
import {addToast} from "@heroui/react";
import {useNavigate} from "react-router";

export function useFetchRooms() {
    return useQuery({
        queryKey: ["rooms"],
        queryFn: () => roomService.fetchRooms(),
        staleTime: 30000,
    });
}

export function useFetchRoom(id: string) {
    return useQuery({
        queryKey: ["rooms", id],
        queryFn: () => roomService.fetchRoom(id),
        staleTime: 30000,
        enabled: !!id
    });
}

export function useCreateRoom() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<
        CreateRoomResponse,
        AxiosError<{ message: string }>,
        CreateRoomFormData
    >({
        mutationFn: (formData) => roomService.createRoom(formData),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["rooms"] })
            await queryClient.refetchQueries({ queryKey: ["rooms"] });

            addToast({
                title: data.message,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
            });

            navigate("/rooms");
        },

        onError: (error) => {
            addToast({
                title: error.response?.data.message || "Failed to create room",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
                variant: "flat",
            });
        },
    });
}

export function useEditRoom() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<
        EditRoomResponse,
        AxiosError<{ message: string }>,
        { id: string, formData: EditRoomFormData },
        { previousRooms: Room[] | undefined; previousRoom: Room | undefined }
    >({
        mutationFn: ({ id, formData }) => roomService.editRoom(id, formData),
        onMutate: async ({ id, formData }) => {
            await queryClient.cancelQueries({ queryKey: ["rooms"] });
            await queryClient.cancelQueries({ queryKey: ["rooms", id] });

            const previousRooms = queryClient.getQueryData<Room[]>(["rooms"]);
            const previousRoom = queryClient.getQueryData<Room>(["rooms", id]);

            queryClient.setQueryData(["rooms",], (old: Room[] | undefined) =>
                old?.map((room) =>
                    (room.id === id ? { ...room, ...formData } : room)
                )
            );

            queryClient.setQueryData(["rooms", id], (old: Room | undefined) =>
                old ? { ...old, ...formData } : old
            );

            return { previousRooms, previousRoom };
        },
        onSuccess: (data, variables) => {
            addToast({
                title: data.message,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
            });

            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            queryClient.invalidateQueries({ queryKey: ["rooms", variables.id] })

            navigate("/rooms");
        },
        onError: (error, _variables, context) => {
            if (context?.previousRooms) {
                queryClient.setQueryData(["rooms"], context.previousRooms);
            }
            if (context?.previousRoom) {
                queryClient.setQueryData(["rooms", _variables.id], context.previousRoom);
            }

            addToast({
                title: error.response?.data.message || "Failed to edit room",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                radius: "sm",
                variant: "flat",
            })
        }
    })
}
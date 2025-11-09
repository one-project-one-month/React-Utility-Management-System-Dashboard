import type { Contracts } from "@/types/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContractType, fetchContractTypes } from "@/services/contractService";
import { addToast } from "@heroui/react";
import { AxiosError } from "axios";
import { fetchRooms } from "@/services/roomService";

export const useCreateContractType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newContract: Partial<Contracts>) =>
      createContractType(newContract),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["contract-types"] });
      addToast({
        title: data.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        radius: "sm",
      });
    },
    onError: (error) => {
      const err = error as AxiosError;
      const status = err?.response?.status ?? err?.status;

      if (status === 400) {
        addToast({
          title: "Invalid request",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          radius: "sm",
        });
      } else if (status === 500) {
        addToast({
          title: "Server error",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          radius: "sm",
        });
      } else if (status === 401) {
        addToast({
          title: "Unauthorized",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          radius: "sm",
        });
      } else {
        addToast({
          title: "Something went wrong",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          radius: "sm",
        });
      }
    },
  });
};

export const useFetchContractTypes = () => {
    return useQuery({
        queryKey: ['contract-types'],
        queryFn: () => fetchContractTypes()
    })
}

export const useFetchRoomOptions = () => {
  return useQuery({
    queryKey: ['tenant-contract'],
    queryFn: () => fetchRooms({
      page: 1,
      limit: 10,
      filter: {
        status: "Available"
      }
    }),
    select: (rooms) => {
      return rooms.data.map((room) => ({
        key: room.id,
        label: room.roomNo
      })) 
    }
  })
}

export const useFetchContractTypeOptions = () => {
  return useQuery({
    queryKey: ['tenant-contract-type'],
    queryFn: () => fetchContractTypes(),
    select: (contractTypes) => {
      return contractTypes.data.map((contractType) => ({
        key: contractType.id,
        label: contractType.name,
        duration: contractType.duration,
        fee: contractType.price
      }))
    }
  })
}



import type { Contracts, NewContract } from "@/types/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   createContractType,
   createNewContract,
   fetchContractTypes,
   fetchTenantNoContract,
} from "@/services/contractService";
import { addToast } from "@heroui/react";
import { AxiosError } from "axios";
import { fetchRoom } from "@/services/roomService";

export const useCreateContractType = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (newContract: Partial<Contracts>) =>
         createContractType(newContract),
      onSuccess: data => {
         queryClient.invalidateQueries({ queryKey: ["contract-types"] });
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
            title: error.message,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });
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

export const useCreateTenantContract = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (newContract: Partial<NewContract>) =>
         createNewContract(newContract),
      onSuccess: async data => {
         await queryClient.invalidateQueries({ queryKey: [""] }); // replace actaul query key here
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
            title: error.message,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            radius: "sm",
         });
      },
   });
};

export const useFetchContractTypes = () => {
   return useQuery({
      queryKey: ["contract-types"],
      queryFn: () => fetchContractTypes(),
   });
};

export const useFetchRoomWithId = (roomId: string) => {
   return useQuery({
      queryKey: ["tenant-roomNo", roomId],
      queryFn: () => fetchRoom(roomId),
      select: room => room.roomNo,
      enabled: !!roomId,
   });
};

export const useFetchContractTypeOptions = () => {
   return useQuery({
      queryKey: ["tenant-contract-type"],
      queryFn: () => fetchContractTypes(),
      select: contractTypes => {
         return contractTypes.data.map(contractType => ({
            key: contractType.id,
            label: contractType.name,
            duration: contractType.duration,
            fee: contractType.price,
         }));
      },
   });
};

export const useFetchTenantsNoContract = () => {
   return useQuery({
      queryKey: ["tenants-no-contract"],
      queryFn: () => fetchTenantNoContract(),
      select: tenants => {
         return tenants.data.map(tenant => ({
            key: tenant.id,
            label: tenant.name,
            roomId: tenant.roomId,
         }));
      },
   });
};

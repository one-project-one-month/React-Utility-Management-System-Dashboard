import {
   fetchCustomerServices,
   updateCustomerService,
   deleteCustomerService,
} from "@/services/customerService";
import type { ServiceFilter, UpdateServiceRequest } from "@/types/customer-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pagination } from "@/types/pagination";
import { addToast } from "@heroui/react";

interface UpdateServiceArgs extends UpdateServiceRequest {
   onEditClose?: () => void;
}

interface DeleteServiceArgs {
   id: string;
   onDeleteClose?: () => void;
}

export const useCustomerService = (
   page: number,
   limit: number,
   filters?: ServiceFilter
) => {
   const pagination: Pagination = { page, limit, filter: filters };

   return useQuery({
      queryKey: ["customer-services", pagination],
      queryFn: () => fetchCustomerServices(pagination, filters),
      placeholderData: previousData => previousData,
   });
};

export const useUpdateCustomerService = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, updates }: UpdateServiceArgs) =>
         updateCustomerService({ id, updates }),
      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({ queryKey: ["customer-services"] });
         addToast({
            title: "Update Successful",
            description: "Service status has been updated successfully.",
            color: "success",
            timeout: 3000,
         });

         //  Optionally close local modal if provided
         variables?.onEditClose?.();
      },
      onError: error => {
         addToast({
            title: "Update failed",
            description: error.message ?? "Please try again.",
            color: "danger",
            timeout: 3000,
         });
      },
   });
};

export const useDeleteCustomerService = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id }: DeleteServiceArgs) => deleteCustomerService(id),
      onSuccess: (_, variables) => {
         // Always refresh data after deletion
         queryClient.invalidateQueries({ queryKey: ["customer-services"] });

         // Show success toast
         addToast({
            title: "Service Deleted",
            description: "Deleted successfully!",
            color: "success",
            timeout: 3000,
         });

         //  Optionally close local modal if provided
         variables?.onDeleteClose?.();
      },
      onError: () => {
         addToast({
            title: "Delete Failed",
            description: "Something went wrong while deleting the service.",
            color: "danger",
            timeout: 3000,
         });
      },
   });
};

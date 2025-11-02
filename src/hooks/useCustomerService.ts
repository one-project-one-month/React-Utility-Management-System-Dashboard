import {
  fetchCustomerServices,
  updateCustomerService,
  deleteCustomerService,
} from "@/services/customerServiceApi";
import type { CustomerService } from "@/types/customer-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pagination } from "@/types/pagination";
import type { ApiResponse } from "@/services/apiResponse";
import { addToast } from "@heroui/react";

interface UpdateServiceArgs {
  id: string;
  updates: Partial<CustomerService>;
  onEditClose?: () => void;
}

interface DeleteServiceArgs {
  id: string;
  onDeleteClose?: () => void;
}


export const useCustomerService = (
  page: number,
  limit: number,
  filters: any
) => {
  const pagination: Pagination = { page, limit, filter: filters };
  return useQuery({
    queryKey: ["customer-services", pagination],
    queryFn: async () => {
      const res = await fetchCustomerServices(pagination, filters);
      return res as ApiResponse<CustomerService>;
    },
  });
};

export const useUpdateCustomerService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: UpdateServiceArgs) =>
      updateCustomerService(id, updates),
    onSuccess: async (_, variables) => {
      await queryClient.refetchQueries({ queryKey: ["customer-services"] });
      await queryClient.invalidateQueries({ queryKey: ["customer-services"] });
      addToast({
        title: "Update Successful",
        description: "Service status has been updated successfully.",
        color: "success",
        timeout: 3000,
      });
      variables?.onEditClose?.();
    },
    onError: (error: any) => {
      addToast({
        title: "Update failed",
        description: error?.response?.data?.message ?? "Please try again.",
        color: "danger",
        timeout: 4000,
      });
    },
  });
};

export const useDeleteCustomerService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteServiceArgs) =>
      deleteCustomerService(id),
    onSuccess: async (_, variables) => {
      await queryClient.refetchQueries({ queryKey: ["customer-services"] });
      addToast({
        title: "Service Deleted",
        description: "Deleted successfully!",
        color: "success",
        timeout: 3000,
      });
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

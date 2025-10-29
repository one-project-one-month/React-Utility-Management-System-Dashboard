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
  onClose?: () => void;
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customer-services"] });
      addToast({
        title: "Update Successful",
        description: "Service status has been updated successfully.",
        color: "success",
        timeout: 3000,
      });
      variables?.onClose?.();
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
    mutationFn: (id: string) => deleteCustomerService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-services"] });
    },
  });
};

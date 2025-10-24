import {
  fetchAllCustomers,
  updateCustomerService,
  deleteCustomerService,
} from "@/services/customerService";
import type {
  ServiceRequest,
  CustomerServiceApiResponse,
} from "@/types/customer-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCustomerService = (
  page: number,
  limit = 10,
  params?: {
    category?: string | undefined;
    status?: string | undefined;
    priorityLevel?: string | undefined;
    search?: string | undefined;
  }
) => {
  return useQuery<
    CustomerServiceApiResponse,
    Error,
    CustomerServiceApiResponse
  >({
    queryKey: ["customer-services", page, limit, params],
    queryFn: () => fetchAllCustomers(page, limit, params),
    retry: 1,
  });
};

export const useUpdateCustomerService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<ServiceRequest>;
    }) => updateCustomerService(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-services"] });
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

import {
  fetchAllCustomers,
  updateCustomerService,
} from "@/services/customerService";
import type {
  ServiceRequest,
  CustomerServiceApiResponse,
} from "@/types/customer-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCustomerService = (page: number, limit: number) => {
  return useQuery<
    CustomerServiceApiResponse,
    Error,
    CustomerServiceApiResponse
  >({
    queryKey: ["customer-services", page],
    queryFn: () => fetchAllCustomers(page, limit),
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

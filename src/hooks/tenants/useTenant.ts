import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTenant,
  fetchAllTenants,
  updateTenant,
} from "@/services/tenantService.ts";
import type { TenantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";
import { addToast } from "@heroui/react";
import type { Pagination } from "@/types/pagination.ts";

export const useFetchAllTenants = (pagination: Pagination, search?: string) => {
  return useQuery({
    queryKey: ["tenants", pagination, search],
    queryFn: () => fetchAllTenants(pagination, search),
  });
};

export const useTenantMutations = () => {
  const queryClient = useQueryClient();

  const createTenantMutation = useMutation({
    mutationKey: ["createTenant"],
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      addToast({
        title: "Created Tenant Successfully",
        color: "success",
        timeout: 2000,
        shouldShowTimeoutProgress: true,
        radius: "sm",
      });
    },
  });

  interface UpdateTenantParams {
    id: string;
    updatedTenant: TenantPayload;
  }
  const updateTenantMutation = useMutation({
    mutationKey: ["updateTenant"],
    mutationFn: ({ updatedTenant, id }: UpdateTenantParams) =>
      updateTenant(id, updatedTenant),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      queryClient.invalidateQueries({ queryKey: ["tenantById", variables.id] });
      addToast({
        title: "Updated Tenant Successfully",
        color: "success",
        timeout: 2000,
        shouldShowTimeoutProgress: true,
        radius: "sm",
      });
    },
  });

  return { createTenantMutation, updateTenantMutation };
};

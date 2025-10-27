import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTenant,
  getAllTenants,
  type GetTenantsParams,
  updateTenant,
} from "@/services/tenantService.ts";
import type { TenantPayload } from "@/types/tenants/ApiPayloads/tenantPayload.ts";

export const useTenants = ({
  currentPage,
  limit,
  search,
  occupancy,
}: GetTenantsParams) => {
  const queryClient = useQueryClient();

  const getAllTenantsQuery = useQuery({
    queryKey: ["tenants", currentPage, search, occupancy],
    queryFn: () => getAllTenants({ currentPage, limit, search, occupancy }),
  });

  const createTenantMutation = useMutation({
    mutationKey: ["createTenant"],
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
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
    },
  });

  return { getAllTenantsQuery, createTenantMutation, updateTenantMutation };
};

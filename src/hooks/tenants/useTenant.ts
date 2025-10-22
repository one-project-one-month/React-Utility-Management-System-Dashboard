import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTenant, getAllTenants } from "@/services/tenantService.ts";

export const useTenants = () => {
  const queryClient = useQueryClient();

  const getAllTenantsQuery = useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });

  const createTenantMutation = useMutation({
    mutationKey: ["createTenant"],
    mutationFn: createTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });

  return { getAllTenantsQuery, createTenantMutation };
};

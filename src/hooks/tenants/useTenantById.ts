import { useQuery } from "@tanstack/react-query";
import { getTenantById } from "@/services/tenantService.ts";

export const useTenantById = (tenantId: string) => {
  const getTenantByIdQuery = useQuery({
    queryKey: ["tenantById", tenantId],
    queryFn: () => getTenantById(tenantId),
    enabled: !!tenantId,
  });

  return { getTenantByIdQuery };
};

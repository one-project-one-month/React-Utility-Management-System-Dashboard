import { useQuery } from "@tanstack/react-query";
import {
  getBillingHistoryByTenantId,
  getContractHistoryByTenantId,
  getCustomerServiceHistoryByTenantId,
} from "@/services/tenantActivitiesHistoryServices.ts";

export const useActivitiesHistoryByTenantId = (tenantId: string) => {
  const getBillingHistoryByTenantIdQuery = useQuery({
    queryKey: ["billingHistoryByTenantId", tenantId],
    queryFn: () => getBillingHistoryByTenantId(tenantId),
    enabled: !!tenantId,
  });

  const getCustomerServiceHistoryByTenantIdQuery = useQuery({
    queryKey: ["customerServiceHistoryByTenantId", tenantId],
    queryFn: () => getCustomerServiceHistoryByTenantId(tenantId),
    enabled: !!tenantId,
  });

  const getContractHistoryByTenantIdQuery = useQuery({
    queryKey: ["contractHistoryByTenantId", tenantId],
    queryFn: () => getContractHistoryByTenantId(tenantId),
    enabled: !!tenantId,
  });

  return {
    getBillingHistoryByTenantIdQuery,
    getCustomerServiceHistoryByTenantIdQuery,
    getContractHistoryByTenantIdQuery,
  };
};

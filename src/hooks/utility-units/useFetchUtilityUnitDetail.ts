import { utilityUnitDetail } from "@/services/utilityUnitServices";
import type { ApiResponse } from "@/types/ApiResponse/ApiResponse";
import type { UtilityUnit } from "@/types/utilityUnit";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchUtilityUnitDetail = (unitId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["utility-unit", unitId],
    queryFn: () => utilityUnitDetail(unitId),
    initialData: () => {
      const cachedData = queryClient.getQueriesData<ApiResponse<UtilityUnit>>({
        queryKey: ["utility-units"],
      });

      const previousData = cachedData.flatMap((d) => d[1]?.content?.data);
     
      if (previousData.length > 0) {
        return {
          content: {
            data: previousData.find((d) => d?.id === unitId),
          },
        };
      }

      return undefined;
    },
  });
};
export default useFetchUtilityUnitDetail;

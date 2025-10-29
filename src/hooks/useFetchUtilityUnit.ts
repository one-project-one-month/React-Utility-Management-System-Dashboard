import utilityUnitServices from "@/services/utilityUnitServices"
import type { Pagination } from "@/types/pagination"
import { useQuery } from "@tanstack/react-query"

const useFetchUtilityUnit = (pagination:Pagination) => {
    
    return useQuery({
        queryKey:['utility-units',pagination],
        queryFn:() => utilityUnitServices(pagination),
    })

}
export default useFetchUtilityUnit
import { fetchAllCustomers } from "@/services/customerService"
import { useQuery } from "@tanstack/react-query"

export const useCustomerService = () => { 
    return useQuery({
        queryKey: ['customer-services'],
        queryFn: fetchAllCustomers,
    })
}
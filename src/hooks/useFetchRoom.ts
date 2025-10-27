import { fetchAllRooms } from "@/services/roomService"
import type { Pagination } from "@/types/pagination"
import { useQuery } from "@tanstack/react-query"

export const useFetchRooms = (pagination: Pagination) => {
    // Implementation for fetching rooms would go here
    return useQuery({
        queryKey: ['rooms', pagination],
        queryFn: () => fetchAllRooms(pagination),
    })
}
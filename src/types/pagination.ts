// import { RoomAvailability } from "@/types/room";

export interface Pagination {
   page: number;
   limit: number;
   filter?: Record<string, number | string>;
}

// export const filter: Pagination = {
//    page: 1,
//    limit: 10,
//    filter: {
//       roomNo: 101,
//       floor: 2,
//       status: RoomAvailability.AVAILABLE,
//    },
// };

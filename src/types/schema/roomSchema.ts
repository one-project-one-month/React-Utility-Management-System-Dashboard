import type { RoomAvailability } from "../room";

export type CreateRoomSchema = {
  roomNo: number;
  floor: number;
  dimension: string;
  noOfBedRoom: number;
  status: RoomAvailability.AVAILABLE;
  sellingPrice: number;
  maxNoOfPeople: number;
  description: string;
};

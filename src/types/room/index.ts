export type Room = {
  id: string;
  roomNo: number;
  floor: number;
  dimension: string;
  noOfBedRoom: number;
  status: string;
  sellingPrice: number;
  maxNoOfPeople: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum RoomAvailability {
  AVAILABLE = "Available",
  RENTED = "Rented",
  MAINTENANCE = "Maintenance",
}

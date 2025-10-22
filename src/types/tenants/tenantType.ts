// export type RelationshipToTenant =
//   | "Spouse"
//   | "Child"
//   | "Parent"
//   | "Relative"
//   | "Friend"
//   | "Other";
// export interface Occupant {
//   id: string;
//   name: string;
//   nrc: string;
//   relationshipToTenant: RelationshipToTenant;
// }
//
// export interface TenantType {
//   id: string;
//   name: string;
//   nrc: string;
//   occupants: Occupant[];
//   email: string;
//   phoneNo: string;
//   emergencyNo: string;
//   roomId: string;
//   contractId: string;
// }

// tenantType.ts

export interface ContractType {
  id: string;
  name: string;
  duration: number;
  price: string;
  facilities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  expiryDate: string;
  createdDate: string;
  updatedDate: string;
  roomId: string;
  tenantId: string;
  contractTypeId: string;
  contractType: ContractType;
}

export type RelationshipToTenant =
  | "SPOUSE"
  | "CHILD"
  | "PARENT"
  | "RELATIVE"
  | "SIBLING"
  | "FRIEND"
  | "OTHER";

export interface Occupant {
  id: string;
  name: string;
  nrc: string | null;
  relationshipToTenant: RelationshipToTenant;
  createdAt: string;
  updatedAt: string;
  tenantId: string;
}

export interface Room {
  id: string;
  roomNo: number;
  floor: number;
  dimension: string;
  noOfBedRoom: number;
  status: "Available" | "Rented" | "Maintenance";
  sellingPrice: string | null;
  maxNoOfPeople: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  nrc: string;
  phoneNo: string;
  emergencyNo: string;
  createdAt: string;
  updatedAt: string;
  roomId: string;
  room: Room;
  occupants: Occupant[];
  contract?: Contract;
}

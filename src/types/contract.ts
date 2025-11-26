export type Contracts = {
   id: number;
   name: string;
   duration: number;
   price: number;
   facilities?: string[];
};

export type NewContract = {
   id: string;
   roomId: string;
   contractTypeId: string;
   tenantId: string;
   createdDate: Date;
   expiryDate: Date;
   updatedDate: Date;
};

export interface TenantContract {
   id: string;
   expiryDate: string; // ISO date string
   createdDate: string; // ISO date string
   updatedDate: string | null;
   roomId: string;
   tenantId: string;
   contractTypeId: string;
   tenant: Tenant;
   room: Room;
   contractType: ContractType;
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
}

export interface Room {
   id: string;
   roomNo: number;
   floor: number;
   dimension: string;
   noOfBedRoom: number;
   status: "Available" | "Rented" | "InMaintenance" | "Purchased";
   sellingPrice: string | null;
   maxNoOfPeople: number;
   description: string;
   createdAt: string;
   updatedAt: string;
}

export interface ContractType {
   id: string;
   name: string;
   duration: number;
   price: string;
   facilities: string[];
   createdAt: string;
   updatedAt: string;
}

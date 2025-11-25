export type Contracts = {
   id: number;
   name: string;
   duration: number;
   price: number;
   facilities?: string[];
};

export type TenantContracts = {
   id: number;
   name: string;
   contractType: string;
   startDate: string;
   endDate: string;
   occupants: number;
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

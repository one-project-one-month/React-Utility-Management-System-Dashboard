type Tenant = {
  name: string;
};
type Room = {
  roomNo: number;
  status: "Available" | "Rented" | "Purchased" | "InMaintenance";
  floor: number;
  tenant: Tenant;
};
export type UtilityUnit = {
  id: string;
  billId: string;
  electricityUnits: number;
  waterUnits: number;
  bill: {
    room: Room;
  };
  tenantName: string;
  createdAt: Date;
  updatedAt: Date;
};

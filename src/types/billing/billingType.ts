export interface Receipt {
  id: string;
  paymentMethod: string;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
  invoiceId: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  status: "Pending" | "Paid" | "Overdue";
  receiptSent: boolean;
  billId: string;
  createdAt: string;
  updatedAt: string;
  receipt: Receipt;
}

export interface TotalUnit {
  id: string;
  electricityUnits: string;
  waterUnits: string;
  createdAt: string;
  updatedAt: string;
  billId: string;
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

export interface Room {
  id: string;
  roomNo: number;
  floor: number;
  dimension: string;
  noOfBedRoom: number;
  status: "Rented" | "Available" | "Maintenance";
  sellingPrice: string | null;
  maxNoOfPeople: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  tenant: Tenant;
  contract: Contract[];
}

export interface Billing {
  id: string;
  rentalFee: string;
  electricityFee: string;
  waterFee: string;
  fineFee?: string;
  serviceFee: string;
  groundFee: string;
  carParkingFee?: string;
  wifiFee: string;
  totalAmount: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  roomId: string;
  room: Room;
  totalUnit: TotalUnit;
  invoice: Invoice;
}

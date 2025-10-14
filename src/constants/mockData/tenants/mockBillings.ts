export interface Billing {
  id: string;
  roomNo: number;
  rentalFee: number;
  electricityFee: number;
  waterFee: number;
  fineFee?: number;
  serviceFee: number;
  groundFee: number;
  carParkingFee?: number;
  wifiFee?: number;
  totalAmount: number;
  dueDate: string;
  createdDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

export const mockBillings: Billing[] = [
  {
    id: "b1",
    roomNo: 101,
    rentalFee: 250000,
    electricityFee: 20000,
    waterFee: 10000,
    fineFee: 0,
    serviceFee: 15000,
    groundFee: 10000,
    carParkingFee: 0,
    wifiFee: 15000,
    totalAmount: 320000,
    dueDate: "2025-02-05",
    createdDate: "2025-02-01",
    status: "Paid",
  },
  {
    id: "b2",
    roomNo: 101,
    rentalFee: 250000,
    electricityFee: 30000,
    waterFee: 12000,
    fineFee: 5000,
    serviceFee: 15000,
    groundFee: 10000,
    wifiFee: 15000,
    totalAmount: 337000,
    dueDate: "2025-03-05",
    createdDate: "2025-03-01",
    status: "Overdue",
  },
];

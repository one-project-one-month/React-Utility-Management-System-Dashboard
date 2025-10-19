export type Billing = {
  id: string;
  roomId: string;
  rentalFee: number;
  electricityFee: number;
  waterFee: number;
  fineFee?: number | null;
  serviceFee: number;
  groundFee: number;
  carParkingFee?: number | null;
  wifiFee?: number | null;
  totalAmount: number;
  dueDate: string;
  createdDate: string;
};

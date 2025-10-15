export type Billing = {
    id: string;                    // PK ID
    roomId: string;                // FK to Room
    rentalFee: number;
    electricityFee: number;
    waterFee: number;
    fineFee?: number | null;       // Nullable
    serviceFee: number;
    groundFee: number;
    carParkingFee?: number | null; // Nullable
    wifiFee?: number | null;       // Nullable
    totalAmount: number;
    dueDate: string;               // DATE (ISO string recommended)
    createdDate: string;           // DATE (ISO string)
};

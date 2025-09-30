export interface Room {
    id: string;
    roomNo: string;
    status: RoomStatus;
    address: string;
    bedrooms: number;
    bathrooms: number;
    floor: number;
    dimension: number;
    createdDate: string;
    tenant: string;
    price: number;
}

export type RoomStatus = 'available' | 'occupied' | 'reserved';
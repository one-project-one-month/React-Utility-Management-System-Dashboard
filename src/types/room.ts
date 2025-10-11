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
    maxNoPeople?: number;
    description?: string;
}

export type RoomStatus = 'available' | 'rented' | 'purchased' | 'maintenance';
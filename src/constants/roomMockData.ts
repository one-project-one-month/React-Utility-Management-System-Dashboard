import type {Room} from "@/types/room.ts";

export type RoomStatus = 'available' | 'occupied' | 'reserved';

export const roomMockData: Room[] = [
    {
        id: '1',
        roomNo: 'Room 101',
        status: 'occupied',
        address: '123 Main Street, Yangon, Myanmar 11011',
        bedrooms: 2,
        bathrooms: 1,
        floor: 1,
        dimension: 650,
        createdDate: 'Oct 15, 2024',
        tenant: 'John Doe',
        price: 180000.00
    },
    {
        id: '2',
        roomNo: 'Room 205',
        status: 'available',
        address: '456 Park Avenue, Yangon, Myanmar 11022',
        bedrooms: 3,
        bathrooms: 2,
        floor: 2,
        dimension: 850,
        createdDate: 'Nov 20, 2024',
        tenant: 'Available',
        price: 250000.00
    },
    {
        id: '3',
        roomNo: 'Room 308',
        status: 'reserved',
        address: '789 Lake View Road, Yangon, Myanmar 11033',
        bedrooms: 1,
        bathrooms: 1,
        floor: 3,
        dimension: 500,
        createdDate: 'Dec 01, 2024',
        tenant: 'Sarah Chen',
        price: 150000.00
    }
];

export const statusColors = {
    available: 'bg-green-400',
    occupied: 'bg-amber-400',
    reserved: 'bg-blue-400'
};

export const statusLabels = {
    available: 'Available',
    occupied: 'Occupied',
    reserved: 'Reserved'
};

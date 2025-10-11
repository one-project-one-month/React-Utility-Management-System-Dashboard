import type {Room} from "@/types/room.ts";

export const roomMockData: Room[] = [
    {
        id: '1',
        roomNo: 'Room 101',
        status: 'purchased',
        address: '123 Main Street, Yangon, Myanmar 11011',
        bedrooms: 2,
        bathrooms: 1,
        floor: 1,
        dimension: 650,
        createdDate: 'Oct 15, 2024',
        tenant: 'John Doe',
        price: 180000.00,
        maxNoPeople: 4,
        description: "Welcome to Oceanview Retreat, an exquisite beachfront property located in the vibrant city of Miami, Florida. Situated along the pristine shores of the Atlantic Ocean, this luxurious estate offers a truly unparalleled coastal living experience. With breathtaking panoramic views of the ocean and direct access to a private white sandy beach, Oceanview Retreat is a haven for relaxation and rejuvenation. Immerse yourself in the soothing sounds of the waves and indulge in the serenity of the surroundings"
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
        price: 250000.00,
        maxNoPeople: 7,
        description: "All rooms feature splendid views of the river and modern interiors. They come with a flat-screen cable TV, a minibar, and a safety deposit box. A bathtub and free toiletries are included in an en suite bathroom. Guests can indulge in a variety of spa and beauty treatments at eforea. Those who seek some sun can head to The Beach, equipped with a 20-meter infinity edge pool and spa pools. The hotel also has 17 meeting rooms, a 24-hour front desk, and a tour desk."
    },
    {
        id: '3',
        roomNo: 'Room 308',
        status: 'rented',
        address: '789 Lake View Road, Yangon, Myanmar 11033',
        bedrooms: 1,
        bathrooms: 1,
        floor: 3,
        dimension: 500,
        createdDate: 'Dec 01, 2024',
        tenant: 'Sarah Chen',
        price: 150000.00,
        maxNoPeople: 5,
        description: "The hotel is conveniently located within a short walking distance from the BTS Gold Line Charoen Nakhon station and can be easily reached via a cross-river ferry from the Si Phaya Pier next to the River City Bangkok shopping center. ICONSIAM, one of the largest shopping malls in Asia, is just a few minutes’ walk from the hotel. "
    },
    {
        id: '4',
        roomNo: 'Room 207',
        status: 'maintenance',
        address: '969 Tha Khin Road, Yangon, Myanmar 11044',
        bedrooms: 3,
        bathrooms: 1,
        floor: 2,
        dimension: 500,
        createdDate: 'Dec 09, 2024',
        tenant: 'Noriko',
        price: 250000.00,
        maxNoPeople: 5,
        description: "Valia Hotel Bangkok, a 5-star hotel in Sukhumvit amidst vibrant shopping and dining, offers 279 elegant guest rooms blending oriental luxury. Each room includes a seating area, HD-LED TV, minibar, and private bathroom. Some room types also feature a microwave, kitchenette, coffee machine, Executive Lounge access. The hotel boasts a high-tech gym, free parking, swimming pool, BelleValia Pool Bar, culinary delights at Florae Restaurant, and the exclusive Eastern Elixir Social Lounge & Bar."
    }
];

export const statusColors = {
    available: 'bg-green-400',
    rented: 'bg-amber-400',
    purchased: 'bg-pink-400',
    maintenance: 'bg-blue-400',
};

export const statusLabels = {
    available: 'Available',
    rented: 'Rented',
    purchased: 'Purchased',
    maintenance: 'Maintenance',
};

// export interface Contract {
//   id: string;
//   tenantId: string;
//   contractName: string;
//   monthlyRentFee: number;
//   startDate: string;
//   endDate: string;
// }

export interface ContractType {
  id: string;
  name: string;
  duration: number; // in months
  price: string; // could be number if you convert
  facilities: string[];
  createdAt: string;
  updatedAt: string;
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

export type RoomStatus = "Rented" | "Purchased" | "Available";

export interface Room {
  id: string;
  roomNo: number;
  floor: number;
  dimension: string;
  noOfBedRoom: number;
  status: RoomStatus;
  sellingPrice: string | null;
  maxNoOfPeople: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  expiryDate: string;
  createdDate: string;
  updatedDate: string | null;
  roomId: string;
  tenantId: string;
  contractTypeId: string;
  tenant: Tenant;
  room: Room;
  contractType: ContractType;
}

export const mockContracts: Contract[] = [
  {
    id: "44204a38-1bd4-49c9-83cc-7c7e155cda4e",
    expiryDate: "2026-04-13T00:00:00.000Z",
    createdDate: "2025-10-13T00:00:00.000Z",
    updatedDate: null,
    roomId: "caac20b9-30fa-4fbf-8ee3-506d2d7fc2ee",
    tenantId: "c9a6ea1a-8aee-4d9e-b2b2-b979ab961eb4",
    contractTypeId: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
    tenant: {
      id: "c9a6ea1a-8aee-4d9e-b2b2-b979ab961eb4",
      name: "Geoffrey Friesen",
      email: "geoffrey.friesen21@gmail.com",
      nrc: "8/ABCD(N)626572",
      phoneNo: "+959904912721",
      emergencyNo: "+959998573165",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "caac20b9-30fa-4fbf-8ee3-506d2d7fc2ee",
    },
    room: {
      id: "caac20b9-30fa-4fbf-8ee3-506d2d7fc2ee",
      roomNo: 204,
      floor: 2,
      dimension: "19x23 ft",
      noOfBedRoom: 1,
      status: "Purchased",
      sellingPrice: "701126",
      maxNoOfPeople: 4,
      description: "Standard room with essential amenities",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
      name: "6 Months",
      duration: 6,
      price: "320000",
      facilities: ["WiFi", "Water", "Electricity", "Security", "Cleaning"],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "b3b098ca-e221-4f1f-b176-be89c1427824",
    expiryDate: "2026-07-28T05:33:02.424Z",
    createdDate: "2025-07-28T05:33:02.424Z",
    updatedDate: "2025-08-01T04:31:02.424Z",
    roomId: "4d6f2242-a6cc-401b-84f9-16d3182360d5",
    tenantId: "5c6bac22-a9f1-4a40-9d39-8db2ee99742a",
    contractTypeId: "3e8e9967-1462-4bf2-8ff7-f198e0f98b3a",
    tenant: {
      id: "5c6bac22-a9f1-4a40-9d39-8db2ee99742a",
      name: "Nicholas Morar",
      email: "nicholas.morar35@gmail.com",
      nrc: "10/ABCD(N)912174",
      phoneNo: "+959186497362",
      emergencyNo: "+959513370398",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "4d6f2242-a6cc-401b-84f9-16d3182360d5",
    },
    room: {
      id: "4d6f2242-a6cc-401b-84f9-16d3182360d5",
      roomNo: 506,
      floor: 5,
      dimension: "23x20 ft",
      noOfBedRoom: 1,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 5,
      description: "Spacious room with natural lighting",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "3e8e9967-1462-4bf2-8ff7-f198e0f98b3a",
      name: "12 Months",
      duration: 12,
      price: "300000",
      facilities: [
        "WiFi",
        "Water",
        "Electricity",
        "Security",
        "Parking",
        "Cleaning",
      ],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "fe8538f7-8348-4eef-958f-cb219c7e0f21",
    expiryDate: "2026-01-27T05:41:02.424Z",
    createdDate: "2025-07-27T05:41:02.424Z",
    updatedDate: "2025-08-03T07:57:02.424Z",
    roomId: "69a455ea-f1ec-4370-a0cb-cead387d89df",
    tenantId: "fd03eb65-830f-472a-8770-01d40e37dcd2",
    contractTypeId: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
    tenant: {
      id: "fd03eb65-830f-472a-8770-01d40e37dcd2",
      name: "James Hettinger",
      email: "james.hettinger72@gmail.com",
      nrc: "8/ABCD(N)119872",
      phoneNo: "+959647660305",
      emergencyNo: "+959868668118",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "69a455ea-f1ec-4370-a0cb-cead387d89df",
    },
    room: {
      id: "69a455ea-f1ec-4370-a0cb-cead387d89df",
      roomNo: 208,
      floor: 2,
      dimension: "16x15 ft",
      noOfBedRoom: 2,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 4,
      description: "Modern design with built-in furniture",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
      name: "6 Months",
      duration: 6,
      price: "320000",
      facilities: ["WiFi", "Water", "Electricity", "Security", "Cleaning"],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "71f8c76f-ac91-48d1-b351-6b9912c8b095",
    expiryDate: "2026-07-27T02:59:02.424Z",
    createdDate: "2025-07-27T02:59:02.424Z",
    updatedDate: "2025-07-28T08:03:02.424Z",
    roomId: "5717a3b2-abe2-45d9-981d-2f730d9a05bf",
    tenantId: "ea804092-e464-4b6c-8a6f-4f0486c0e161",
    contractTypeId: "3e8e9967-1462-4bf2-8ff7-f198e0f98b3a",
    tenant: {
      id: "ea804092-e464-4b6c-8a6f-4f0486c0e161",
      name: "Alice Sipes",
      email: "alice.sipes95@gmail.com",
      nrc: "12/ABCD(N)708901",
      phoneNo: "+959028115940",
      emergencyNo: "+959526271867",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "5717a3b2-abe2-45d9-981d-2f730d9a05bf",
    },
    room: {
      id: "5717a3b2-abe2-45d9-981d-2f730d9a05bf",
      roomNo: 118,
      floor: 1,
      dimension: "13x17 ft",
      noOfBedRoom: 3,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 6,
      description: "City view with balcony",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "3e8e9967-1462-4bf2-8ff7-f198e0f98b3a",
      name: "12 Months",
      duration: 12,
      price: "300000",
      facilities: [
        "WiFi",
        "Water",
        "Electricity",
        "Security",
        "Parking",
        "Cleaning",
      ],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "ce7da5bf-9fa7-4824-9100-4827e8f1ba80",
    expiryDate: "2026-01-15T10:52:02.424Z",
    createdDate: "2025-07-15T10:52:02.424Z",
    updatedDate: "2025-07-19T03:13:02.424Z",
    roomId: "59179172-1aa4-4cf3-9e12-487dd9f95daa",
    tenantId: "ed3aa463-1f80-462c-a529-552164fc5e65",
    contractTypeId: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
    tenant: {
      id: "ed3aa463-1f80-462c-a529-552164fc5e65",
      name: "Christina Jenkins",
      email: "christina.jenkins85@gmail.com",
      nrc: "10/ABCD(N)291849",
      phoneNo: "+959613619728",
      emergencyNo: "+959280888901",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "59179172-1aa4-4cf3-9e12-487dd9f95daa",
    },
    room: {
      id: "59179172-1aa4-4cf3-9e12-487dd9f95daa",
      roomNo: 510,
      floor: 5,
      dimension: "22x21 ft",
      noOfBedRoom: 2,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 5,
      description: "City view with balcony",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
      name: "6 Months",
      duration: 6,
      price: "320000",
      facilities: ["WiFi", "Water", "Electricity", "Security", "Cleaning"],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "21ce86ec-4c4c-4b2a-acee-0284a7fd8ae5",
    expiryDate: "2027-07-03T04:36:02.424Z",
    createdDate: "2025-07-03T04:36:02.424Z",
    updatedDate: "2025-07-09T05:22:02.424Z",
    roomId: "cf0ca1df-2b67-4b8a-a172-b11dc74783fa",
    tenantId: "c3ccc01f-03c2-4d4a-8675-22b90fff81d2",
    contractTypeId: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
    tenant: {
      id: "c3ccc01f-03c2-4d4a-8675-22b90fff81d2",
      name: "Kathryn Von",
      email: "kathryn.von38@gmail.com",
      nrc: "11/ABCD(N)815159",
      phoneNo: "+959235416466",
      emergencyNo: "+959384221521",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "cf0ca1df-2b67-4b8a-a172-b11dc74783fa",
    },
    room: {
      id: "cf0ca1df-2b67-4b8a-a172-b11dc74783fa",
      roomNo: 517,
      floor: 5,
      dimension: "23x14 ft",
      noOfBedRoom: 2,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 2,
      description: "City view with balcony",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
      name: "24 Months",
      duration: 24,
      price: "280000",
      facilities: [
        "WiFi",
        "Water",
        "Electricity",
        "Security",
        "Gym",
        "Parking",
        "Cleaning",
      ],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "8eeb5817-a6aa-42b0-9a26-feb688c7ef6f",
    expiryDate: "2025-12-16T04:10:02.424Z",
    createdDate: "2025-06-16T04:10:02.424Z",
    updatedDate: "2025-06-18T10:16:02.424Z",
    roomId: "6893ed00-e0d5-4509-85b1-110c490d083d",
    tenantId: "2dcfcbba-a2eb-47fe-b3b7-6f49796c2de4",
    contractTypeId: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
    tenant: {
      id: "2dcfcbba-a2eb-47fe-b3b7-6f49796c2de4",
      name: "Horace Schaefer I",
      email: "horace.schaefer.i33@gmail.com",
      nrc: "2/ABCD(N)126274",
      phoneNo: "+959753337572",
      emergencyNo: "+959278724425",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "6893ed00-e0d5-4509-85b1-110c490d083d",
    },
    room: {
      id: "6893ed00-e0d5-4509-85b1-110c490d083d",
      roomNo: 404,
      floor: 4,
      dimension: "13x20 ft",
      noOfBedRoom: 3,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 6,
      description: "Standard room with essential amenities",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "298340ac-2c3f-4d77-b6f9-3211ba92d861",
      name: "6 Months",
      duration: 6,
      price: "320000",
      facilities: ["WiFi", "Water", "Electricity", "Security", "Cleaning"],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "ae735994-b3fd-438a-9598-01705a7ebe76",
    expiryDate: "2027-06-12T05:54:02.424Z",
    createdDate: "2025-06-12T05:54:02.424Z",
    updatedDate: "2025-06-14T08:43:02.424Z",
    roomId: "464bc3db-4113-42ab-8a59-480267271b5b",
    tenantId: "5e2aeb8f-1cd5-4a8a-9a9b-61d38fb237b5",
    contractTypeId: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
    tenant: {
      id: "5e2aeb8f-1cd5-4a8a-9a9b-61d38fb237b5",
      name: "Paula Pagac",
      email: "paula.pagac14@gmail.com",
      nrc: "12/ABCD(N)835401",
      phoneNo: "+959551915537",
      emergencyNo: "+959231833581",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "464bc3db-4113-42ab-8a59-480267271b5b",
    },
    room: {
      id: "464bc3db-4113-42ab-8a59-480267271b5b",
      roomNo: 514,
      floor: 5,
      dimension: "23x23 ft",
      noOfBedRoom: 1,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 2,
      description: "Standard room with essential amenities",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
      name: "24 Months",
      duration: 24,
      price: "280000",
      facilities: [
        "WiFi",
        "Water",
        "Electricity",
        "Security",
        "Gym",
        "Parking",
        "Cleaning",
      ],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "21c95ecf-ab58-4f65-a58a-71c354050795",
    expiryDate: "2027-06-02T05:43:02.424Z",
    createdDate: "2025-06-02T05:43:02.424Z",
    updatedDate: "2025-06-04T07:52:02.424Z",
    roomId: "a0bced71-51d5-418b-b8fb-9657c96ee0b3",
    tenantId: "1b416f2f-e7ff-4ac9-8ee1-8590089d427b",
    contractTypeId: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
    tenant: {
      id: "1b416f2f-e7ff-4ac9-8ee1-8590089d427b",
      name: "Stanley Walker",
      email: "stanley.walker86@gmail.com",
      nrc: "11/ABCD(N)351430",
      phoneNo: "+959537882631",
      emergencyNo: "+959341151400",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "a0bced71-51d5-418b-b8fb-9657c96ee0b3",
    },
    room: {
      id: "a0bced71-51d5-418b-b8fb-9657c96ee0b3",
      roomNo: 212,
      floor: 2,
      dimension: "19x16 ft",
      noOfBedRoom: 1,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 5,
      description: "Spacious room with natural lighting",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
      name: "24 Months",
      duration: 24,
      price: "280000",
      facilities: [
        "WiFi",
        "Water",
        "Electricity",
        "Security",
        "Gym",
        "Parking",
        "Cleaning",
      ],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
  {
    id: "53a737de-9f48-4c7c-8d93-19b3829adace",
    expiryDate: "2027-05-17T07:06:02.424Z",
    createdDate: "2025-05-17T07:06:02.424Z",
    updatedDate: "2025-05-20T06:49:02.424Z",
    roomId: "74fd373e-d4cd-4af7-85e9-d4a871d14a02",
    tenantId: "ea442e18-c5e3-402d-ae6d-30d53daf70a0",
    contractTypeId: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
    tenant: {
      id: "ea442e18-c5e3-402d-ae6d-30d53daf70a0",
      name: "Dr. Nathaniel Weber",
      email: "dr..nathaniel.weber41@gmail.com",
      nrc: "2/ABCD(N)937832",
      phoneNo: "+959371662967",
      emergencyNo: "+959718168244",
      createdAt: "2025-10-18T01:33:01.431Z",
      updatedAt: "2025-10-18T01:33:01.431Z",
      roomId: "74fd373e-d4cd-4af7-85e9-d4a871d14a02",
    },
    room: {
      id: "74fd373e-d4cd-4af7-85e9-d4a871d14a02",
      roomNo: 219,
      floor: 2,
      dimension: "13x23 ft",
      noOfBedRoom: 2,
      status: "Rented",
      sellingPrice: null,
      maxNoOfPeople: 4,
      description: "Spacious room with natural lighting",
      createdAt: "2025-10-18T01:33:00.823Z",
      updatedAt: "2025-10-18T01:33:00.823Z",
    },
    contractType: {
      id: "2f8970d7-eac2-4b26-a45f-ffcb0a48ace2",
      name: "24 Months",
      duration: 24,
      price: "280000",
      facilities: [
        "WiFi",
        "Water",
        "Electricity",
        "Security",
        "Gym",
        "Parking",
        "Cleaning",
      ],
      createdAt: "2025-10-18T01:33:00.559Z",
      updatedAt: "2025-10-18T01:33:00.559Z",
    },
  },
];

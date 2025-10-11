import type { ServiceRequest } from "@/types/customer-service";

export const serviceRequestMockData: ServiceRequest[] = [
  {
    id: "CS001",
    roomNo: "A-101",
    category: "complain",
    description:
      "Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.",
    status: "pending",
    priority: "high",
    issuedDate: "2025-10-01",
  },
  {
    id: "CS002",
    roomNo: "B-205",
    category: "maintenance",
    description: "Leaky faucet in the bathroom.",
    status: "ongoing",
    priority: "medium",
    issuedDate: "2025-09-28",
  },
  {
    id: "CS003",
    roomNo: "C-301",
    category: "complain",
    description: "Internet is constantly dropping connection.",
    status: "resolved",
    priority: "low",
    issuedDate: "2025-09-25",
  },
  {
    id: "CS004",
    roomNo: "D-402",
    category: "maintenance",
    description: "Air conditioning unit is making a loud noise.",
    status: "pending",
    priority: "medium",
    issuedDate: "2025-10-05",
  },
  {
    id: "CS005",
    roomNo: "E-501",
    category: "other",
    description: "Keycard access is not working at the main door.",
    status: "ongoing",
    priority: "high",
    issuedDate: "2025-10-02",
  },
];

// export const P
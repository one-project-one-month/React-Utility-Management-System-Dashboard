import type { ServiceRequest } from "@/types/customer-service";

export const serviceRequestMockData: ServiceRequest[] = [
  {
    id: "CS001",
    roomNo: "A-101",
    category: "Complain",
    description:
      "Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.Lights flickering in the living room.",
    status: "Pending",
    priority: "High",
    issuedDate: "2025-10-01",
  },
  {
    id: "CS002",
    roomNo: "B-205",
    category: "Maintenance",
    description: "Leaky faucet in the bathroom.",
    status: "Ongoing",
    priority: "Medium",
    issuedDate: "2025-09-28",
  },
  {
    id: "CS003",
    roomNo: "C-301",
    category: "Complain",
    description: "Internet is constantly dropping connection.",
    status: "Resolved",
    priority: "Low",
    issuedDate: "2025-09-25",
  },
  {
    id: "CS004",
    roomNo: "D-402",
    category: "Maintenance",
    description: "Air conditioning unit is making a loud noise.",
    status: "Pending",
    priority: "Medium",
    issuedDate: "2025-10-05",
  },
  {
    id: "CS005",
    roomNo: "E-501",
    category: "Other",
    description: "Keycard access is not working at the main door.",
    status: "Ongoing",
    priority: "High",
    issuedDate: "2025-10-02",
  },
];

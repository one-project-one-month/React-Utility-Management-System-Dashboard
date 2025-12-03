// export interface Service {
//   caseId: string;
//   roomId: number;
//   category: "Complain" | "Maintenance" | "Other";
//   description: string;
//   status: "Pending" | "Ongoing" | "Resolved";
//   priorityLevel: "Low" | "Medium" | "High";
//   issuedDate: string;
// }

export type ServiceCategory = "Complain" | "Maintenance" | "Other";
export type ServiceStatus = "Pending" | "Ongoing" | "Resolved";
export type PriorityLevel = "Low" | "Medium" | "High";

export interface CustomerService {
  id: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  priorityLevel: PriorityLevel;
  issuedDate: string;
  createdAt: string;
  updatedAt: string;
  roomId: string;
  roomNo: number;
}

export const mockServices: CustomerService[] = [
  {
    id: "011d5cb5-6f8c-45a0-b7b9-208262f3d47e",
    description: "Tibi nostrum sit comitatus denique alo cervus.",
    category: "Maintenance",
    status: "Resolved",
    priorityLevel: "Medium",
    issuedDate: "2024-09-07T06:05:04.317Z",
    createdAt: "2024-09-07T06:05:04.317Z",
    updatedAt: "2024-09-13T06:26:04.317Z",
    roomId: "5f0927e9-6c9b-4a1d-ace9-5adba923264e",
    roomNo: 419,
  },
  {
    id: "09d0845a-0f5d-47ac-8c75-eedf7fbadf69",
    description: "Adaugeo pecto tabesco validus stella voluptatibus.",
    category: "Complain",
    status: "Resolved",
    priorityLevel: "High",
    issuedDate: "2025-04-19T04:05:04.314Z",
    createdAt: "2025-04-19T04:05:04.314Z",
    updatedAt: "2025-04-22T02:25:04.314Z",
    roomId: "8a459b66-18f4-4376-9869-79343cb824b5",
    roomNo: 112,
  },
  {
    id: "0a12213e-e567-4df3-98bb-00a516b2772c",
    description: "Nostrum quibusdam arx corrupti defaeco averto.",
    category: "Complain",
    status: "Pending",
    priorityLevel: "High",
    issuedDate: "2024-10-28T06:17:04.316Z",
    createdAt: "2024-10-28T06:17:04.316Z",
    updatedAt: "2024-11-04T03:21:04.316Z",
    roomId: "0347f429-2af1-436f-b52e-34674fd00131",
    roomNo: 402,
  },
  {
    id: "0a8794ff-86ce-4fa8-a084-e30b68a8a2e1",
    description: "Caries vesica tactus ago.",
    category: "Maintenance",
    status: "Resolved",
    priorityLevel: "Low",
    issuedDate: "2024-08-07T08:34:04.315Z",
    createdAt: "2024-08-07T08:34:04.315Z",
    updatedAt: "2024-08-13T04:28:04.315Z",
    roomId: "79bf60a6-8ba2-4f2a-8dfd-ff0126bb0962",
    roomNo: 310,
  },
  {
    id: "0af238e1-662c-4d05-bc02-9f10c38e5da6",
    description: "Aperio crudelis color demulceo utrum carcer defessus.",
    category: "Maintenance",
    status: "Resolved",
    priorityLevel: "Medium",
    issuedDate: "2025-01-11T02:02:04.314Z",
    createdAt: "2025-01-11T02:02:04.314Z",
    updatedAt: "2025-01-18T04:44:04.314Z",
    roomId: "ea052af9-d77d-4be3-b304-0b1e3a191b22",
    roomNo: 206,
  },
  {
    id: "0ddff685-578c-4891-820a-6f93370cb9fd",
    description: "Termes corona calcar tabesco adulatio valens.",
    category: "Complain",
    status: "Resolved",
    priorityLevel: "Medium",
    issuedDate: "2025-10-14T05:36:04.318Z",
    createdAt: "2025-10-14T05:36:04.318Z",
    updatedAt: "2025-10-18T04:14:04.318Z",
    roomId: "9084078a-5b61-4277-96b4-c9bbfedbab55",
    roomNo: 515,
  },
  {
    id: "0e01b134-7e40-47cc-b9ec-7a926baa1d76",
    description:
      "Denuncio apud tabella utpote incidunt repellendus tergum spectaculum ullam decimus.",
    category: "Complain",
    status: "Resolved",
    priorityLevel: "Medium",
    issuedDate: "2024-12-05T02:35:04.316Z",
    createdAt: "2024-12-05T02:35:04.316Z",
    updatedAt: "2024-12-07T06:47:04.316Z",
    roomId: "0347f429-2af1-436f-b52e-34674fd00131",
    roomNo: 402,
  },
  {
    id: "10c7ac41-1043-4f5a-badf-c77174d4792a",
    description:
      "Adinventitias claudeo neque reprehenderit optio adiuvo atque utilis vicinus victoria.",
    category: "Maintenance",
    status: "Ongoing",
    priorityLevel: "Medium",
    issuedDate: "2024-07-19T05:05:04.315Z",
    createdAt: "2024-07-19T05:05:04.315Z",
    updatedAt: "2024-07-20T04:18:04.315Z",
    roomId: "78f293d8-d2df-4734-8564-335ab15e8b87",
    roomNo: 306,
  },
  {
    id: "1220973d-ef6e-41da-a79b-21ee6cb261cb",
    description: "Comes quae ventosus ambitus adfero quos decerno.",
    category: "Maintenance",
    status: "Resolved",
    priorityLevel: "Medium",
    issuedDate: "2025-05-01T05:58:04.317Z",
    createdAt: "2025-05-01T05:58:04.317Z",
    updatedAt: "2025-05-06T09:09:04.317Z",
    roomId: "429f30e1-5b5b-49a9-b8bd-40d562cbabbe",
    roomNo: 504,
  },
  {
    id: "1289f034-fc9b-4050-9f20-2363c0588975",
    description: "Aurum aiunt veritatis aeneus comitatus comburo.",
    category: "Other",
    status: "Resolved",
    priorityLevel: "Low",
    issuedDate: "2025-01-05T09:58:04.313Z",
    createdAt: "2025-01-05T09:58:04.313Z",
    updatedAt: "2025-01-10T02:14:04.313Z",
    roomId: "4d73e828-7f04-4b24-be55-6f4314510f03",
    roomNo: 107,
  },
];

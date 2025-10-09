export interface Service {
  caseId: string;
  roomId: number;
  category: "Complain" | "Maintenance" | "Other";
  description: string;
  status: "Pending" | "Ongoing" | "Resolved";
  priorityLevel: "Low" | "Medium" | "High";
  issuedDate: string;
}

export const mockServices: Service[] = [
  {
    caseId: "s1",
    roomId: 101,
    category: "Maintenance",
    description: "Aircon not cooling properly.",
    status: "Ongoing",
    priorityLevel: "High",
    issuedDate: "2025-04-10",
  },
  {
    caseId: "s2",
    roomId: 101,
    category: "Complain",
    description: "Water leakage in bathroom.",
    status: "Resolved",
    priorityLevel: "Medium",
    issuedDate: "2025-01-15",
  },
];

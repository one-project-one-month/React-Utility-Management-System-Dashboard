export interface ServiceRequest {
  id: string; // Case Id
  roomNo: string; // Room number/identifier
  category: Category;
  description: string;
  status: "pending" | "ongoing" | "resolved";
  priority: "low" | "medium" | "high";
  issuedDate: string; // DATE string (e.g., "YYYY-MM-DD")
}

export type Category = "complain" | "maintenance" | "other";

export type Status = "all" | "pending" | "ongoing" | "resolved";

export type Priority = "low" | "medium" | "high";

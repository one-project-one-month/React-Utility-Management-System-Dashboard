export interface ServiceRequest {
  id: string; // Case Id
  roomNo: string; // Room number/identifier
  category: Category;
  description: string;
  status: Status;
  priority: Priority;
  issuedDate: string; // DATE string (e.g., "YYYY-MM-DD")
}

export type Category = "complain" | "maintenance" | "other";

export type Status = "pending" | "ongoing" | "resolved";

export type Priority = "low" | "medium" | "high";

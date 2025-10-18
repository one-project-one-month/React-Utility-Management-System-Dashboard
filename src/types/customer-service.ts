export interface ServiceRequest {
  id: string; // Case Id
  roomNo: string; // Room number/identifier
  category: Category;
  description: string;
  status: Status;
  priority: Priority;
  issuedDate: string; // DATE string (e.g., "YYYY-MM-DD")
}

export type Category = "Complain" | "Maintenance" | "Other";

export type Status = "Pending" | "Ongoing" | "Resolved";

export type Priority = "Low" | "Medium" | "High";

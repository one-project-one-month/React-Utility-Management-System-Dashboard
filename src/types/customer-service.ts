export interface ServiceRequest {
  id: string;
  roomId: string;
  roomNo: string;
  category: Category;
  priorityLevel: Priority;
  status: Status;
  description: string;
  issuedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerServiceApiResponse {
  success: boolean;
  content: {
    data: ServiceRequest[];
  };
}

export type Category = "Complain" | "Maintenance" | "Other";

export type Status = "Pending" | "Ongoing" | "Resolved";

export type Priority = "Low" | "Medium" | "High";

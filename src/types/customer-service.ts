export interface CustomerService {
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
export type Category = "Complain" | "Maintenance" | "Other";
export type Status = "Pending" | "Ongoing" | "Resolved";
export type Priority = "Low" | "Medium" | "High";

export type ServiceFilter = Partial<{
   category: Category | "";
   status: Status | "";
   priorityLevel: Priority | "";
   search: string;
}>;

export interface UpdateServiceRequest {
   id: string;
   updates: {
      status: Status;
   };
}

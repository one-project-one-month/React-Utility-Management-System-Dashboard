export type ContractAnalytics = {
   contractType: string;
   tenantCount: number;
};

export type BillAnalytics = {
   month: string;
   pending: number;
   paid: number;
   overdue: number;
};

export type RoomAnalytics = {
   status: string;
   count: number;
};

export type RevenueAnalytics = Record<`${number}-${number}`, number>;

export type CustomerServiceCategory = {
   countByCategory: {
      complain: number;
      maintenance: number;
      other: number;
   };
};

export type CustomerServicePriority = {
   countByPriority: {
      high: number;
      medium: number;
      low: number;
   };
};

export type CustomerServiceStatus = {
   countByStatus: {
      [status: string]: {
         all: number;
         high: number;
         medium: number;
         low: number;
      };
   };
};

export type CustomerServiceFilter = {
   query: "status" | "priority" | "category"
   status?: "Pending" | "Ongoing" | "Resolved"
   from: Date
   to: Date
}

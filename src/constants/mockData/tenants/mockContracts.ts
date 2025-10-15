export interface Contract {
    id: string;
    tenantId: string;          // FK to Tenant
    contractName: string;
    monthlyRentFee: number;
    startDate: string;
    endDate: string;
}

export const mockContracts: Contract[] = [
    {
        id: "c1",
        tenantId: "t1",
        contractName: "Standard 1-Year Contract",
        monthlyRentFee: 300000,
        startDate: "2025-01-01",
        endDate: "2025-12-31",
    },
    {
        id: "c2",
        tenantId: "t2",
        contractName: "Premium 2-Year Contract",
        monthlyRentFee: 450000,
        startDate: "2025-02-01",
        endDate: "2027-01-31",
    },
    {
        id: "c3",
        tenantId: "t3",
        contractName: "Short-Term 6-Month Contract",
        monthlyRentFee: 250000,
        startDate: "2025-03-01",
        endDate: "2025-08-31",
    },
    {
        id: "c4",
        tenantId: "t4",
        contractName: "Monthly Flexible Contract",
        monthlyRentFee: 200000,
        startDate: "2025-04-01",
        endDate: "2025-04-30",
    },
    {
        id: "c5",
        tenantId: "t5",
        contractName: "Deluxe 3-Year Contract",
        monthlyRentFee: 550000,
        startDate: "2025-05-01",
        endDate: "2028-04-30",
    },
    {
        id: "c6",
        tenantId: "t6",
        contractName: "Student 9-Month Contract",
        monthlyRentFee: 180000,
        startDate: "2025-06-01",
        endDate: "2026-02-28",
    },
    {
        id: "c7",
        tenantId: "t7",
        contractName: "Corporate Annual Contract",
        monthlyRentFee: 500000,
        startDate: "2025-07-01",
        endDate: "2026-06-30",
    },
    {
        id: "c8",
        tenantId: "t8",
        contractName: "Family 18-Month Contract",
        monthlyRentFee: 350000,
        startDate: "2025-08-01",
        endDate: "2027-01-31",
    },
    {
        id: "c9",
        tenantId: "t9",
        contractName: "Executive 2-Year Plus Plan",
        monthlyRentFee: 600000,
        startDate: "2025-09-01",
        endDate: "2027-08-31",
    },
    {
        id: "c10",
        tenantId: "t10",
        contractName: "Basic 6-Month Renewal Contract",
        monthlyRentFee: 220000,
        startDate: "2025-10-01",
        endDate: "2026-03-31",
    },
    {
        id: "c11",
        tenantId: "t11",
        contractName: "Trial 3-Month Contract",
        monthlyRentFee: 150000,
        startDate: "2025-11-01",
        endDate: "2026-01-31",
    },
    {
        id: "c12",
        tenantId: "t12",
        contractName: "VIP Lifetime Contract",
        monthlyRentFee: 1000000,
        startDate: "2025-01-01",
        endDate: "2099-12-31",
    },
];

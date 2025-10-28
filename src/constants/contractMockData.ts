import type { Contracts } from "@/types/contract";

export const contractTypes: Contracts[] = [
	{
		id: 1,
		name: "Standard Plan",
		duration: "6 months",
		price: 100,
		facilities: ["Water Cooler", "Air Conditioner"],
	},
	{
		id: 2,
		name: "Premium Plan",
		duration: "1 year",
		price: 180,
		facilities: ["TV", "Gas"],
	},
	{
		id: 3,
		name: "Basic Plan",
		duration: "3 months",
		price: 60,
		facilities: ["Washing Machine"],
	},
	{
		id: 4,
		name: "Family Plan",
		duration: "2 years",
		price: 300,
		facilities: ["Wi-fi", "Gas"],
	},
	{
		id: 5,
		name: "Single Plan",
		duration: "1 year",
		price: 120,
		facilities: ["Refrigerator"],
	},
];

export const tenantContracts = [
	{
		id: 1,
		name: "John Doe",
		contractType: "Standard Plan",
		startDate: "2023-01-01",
		endDate: "2023-12-31",
		occupants: 2,
	},
	{
		id: 2,
		name: "Jane Smith",
		contractType: "Premium Plan",
		startDate: "2023-03-15",
		endDate: "2024-03-14",
		occupants: 1,
	},
	{
		id: 3,
		name: "Alice Johnson",
		contractType: "Basic Plan",
		startDate: "2023-07-01",
		endDate: "2023-09-30",
		occupants: 3,
	},
	{
		id: 4,
		name: "Bob Brown",
		contractType: "Family Plan",
		startDate: "2022-11-01",
		endDate: "2024-10-31",
		occupants: 4,
	},
];

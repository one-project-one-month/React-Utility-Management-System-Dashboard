export type Contracts = {
	id: number;
	name: string;
	duration: string;
	price: number;
	facilities?: string[];
};

export type TenantContracts = {
	id: number;
	name: string;
	contractType: string;
	startDate: string;
	endDate: string;
	occupants: number;
};

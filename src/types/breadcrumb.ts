export type BreadCrumbItem = {
	label: string;
	href: string;
};

export type BreadCrumbs = {
	[key: string]: BreadCrumbItem[];
};

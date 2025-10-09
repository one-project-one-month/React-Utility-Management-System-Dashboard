import { createColumnHelper } from "@tanstack/react-table";

type Contract = {
    id: number;
    name: string;
    duration: string;
    price: number;
    facilities: string[];
}

const contracts: Contract[] = [
    { id: 1, name: "Basic Plan", duration: "Monthly", price: 29.99, facilities: ["Facility A", "Facility B"] },
    { id: 2, name: "Standard Plan", duration: "Yearly", price: 299.99, facilities: ["Facility A", "Facility B", "Facility C"] },
    { id: 3, name: "Premium Plan", duration: "Monthly", price: 49.99, facilities: ["Facility A", "Facility B", "Facility C", "Facility D"] },
    { id: 4, name: "Enterprise Plan", duration: "Yearly", price: 499.99, facilities: ["Facility A", "Facility B", "Facility C", "Facility D", "Facility E"] },
];

const columnHelper = createColumnHelper<TenantTableColumnsType | TenantType>();

export default function ContractColumns() {
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Duration',
            accessorKey: 'duration',
        },
        {
            header: 'Price',
            accessorKey: 'price',
        },
        {
            header: 'Facilities',
            accessorKey: 'facilities',
            cell: (info: any) => info.getValue().join(', '),
        },
    ];
}
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
// import { table } from '@heroui/theme'

type Contract = {
    id: number;
    name: string;
    duration: string;
    price: number;
    facilities: string[];
}

export interface ContractColumn {
    no: number;
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

const columnHelper = createColumnHelper<Contract>()
export default function ContractList() {

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

    const table = useReactTable({
        data: contracts,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className=' shadow-lg bg-white mt-6'>
            <table className="border-collapse border border-slate-400   table-auto w-full">
                <thead className='bg-gray-200 table-header-group'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr className='px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600' key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='divide-y divide-gray-200 text-center'>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className='hover:bg-gray-100 odd:bg-white even:bg-gray-50'>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='table-cell px-4 py-2 border border-gray-200 text-sm'>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}


<<<<<<< HEAD
=======
"use client";

>>>>>>> d147e57 (Cursor)
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/data-table";

type User = {
<<<<<<< HEAD
  id: number;
  name: string;
  email: string;
};

const ExamplePage = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Table columns
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
  ];

  // Simulate server-side fetch
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      const start = (page - 1) * pageSize;
      const paginatedData = mockUsers.slice(start, start + pageSize);

      setData(paginatedData);
      setTotalElements(mockUsers.length);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Data Table Example</h2>

      <DataTable
        columns={columns}
        data={data}
        isManualPagination
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </div>
  );
=======
     id: number;
     name: string;
     email: string;
};

const ExamplePage = () => {
     const [data, setData] = useState<User[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [page, setPage] = useState(1);
     const [pageSize] = useState(10);
     const [totalElements, setTotalElements] = useState(0);

     // Table columns
     const columns: ColumnDef<User>[] = [
          {
               accessorKey: "id",
               header: "ID",
               cell: info => info.getValue(),
          },
          {
               accessorKey: "name",
               header: "Name",
               cell: info => info.getValue(),
          },
          {
               accessorKey: "email",
               header: "Email",
               cell: info => info.getValue(),
          },
     ];

     // Simulate server-side fetch
     useEffect(() => {
          setIsLoading(true);

          const timeout = setTimeout(() => {
               const start = (page - 1) * pageSize;
               const paginatedData = mockUsers.slice(start, start + pageSize);

               setData(paginatedData);
               setTotalElements(mockUsers.length);
               setIsLoading(false);
          }, 1000);

          return () => clearTimeout(timeout);
     }, [page, pageSize]);

     const handlePageChange = (newPage: number) => {
          setPage(newPage);
     };

     return (
          <div className="p-6">
               <h2 className="text-xl font-semibold mb-4">
                    Data Table Example
               </h2>

               <DataTable
                    columns={columns}
                    data={data}
                    isManualPagination
                    isLoading={isLoading}
                    page={page}
                    pageSize={pageSize}
                    totalElements={totalElements}
                    onPageChange={handlePageChange}
               />
          </div>
     );
>>>>>>> d147e57 (Cursor)
};

// Mock dataset
const mockUsers: User[] = Array.from({ length: 42 }, (_, i) => ({
<<<<<<< HEAD
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
=======
     id: i + 1,
     name: `User ${i + 1}`,
     email: `user${i + 1}@example.com`,
>>>>>>> d147e57 (Cursor)
}));

export default ExamplePage;

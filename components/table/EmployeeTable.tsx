"use client";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortDirection,
  type SortingState,
} from "@tanstack/react-table";
import { getEmployees } from "@/lib/data";
import type { Employee } from "@/lib/schema";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { columns, searchFilter } from "./columns";
import { Pagination } from "./Pagination";
import { Toolbar } from "./Toolbar";

const ARIA_SORT: Record<SortDirection, "ascending" | "descending"> = {
  asc: "ascending",
  desc: "descending",
};

function SortIcon({ dir }: { dir: false | SortDirection }) {
  if (!dir) return <span className="text-zinc-300">↕</span>;
  return <span>{dir === "asc" ? "↑" : "↓"}</span>;
}

export function EmployeeTable() {
  const [data, setData] = useState<Employee[] | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useState("");
  const globalFilter = useDebouncedValue(search);

  useEffect(() => {
    getEmployees().then(setData);
  }, []);

  // TanStack Table is not React Compiler compatible; the compiler skips this component
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: searchFilter,
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!data) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div className="space-y-4">
      <Toolbar table={table} search={search} onSearchChange={setSearch} />
      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600 uppercase">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const dir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={dir ? ARIA_SORT[dir] : undefined}
                      className="px-4 py-3 font-semibold whitespace-nowrap"
                    >
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1 uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <SortIcon dir={dir} />
                      </button>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </div>
  );
}

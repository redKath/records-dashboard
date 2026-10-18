"use client";

import { useEffect, useMemo, useState } from "react";
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
import type { Employee, EmployeeFormValues } from "@/lib/schema";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { EmployeeForm } from "@/components/forms/EmployeeForm";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Drawer } from "@/components/ui/Drawer";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { getColumns, searchFilter } from "./columns";
import { EmployeeDetails } from "./EmployeeDetails";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // "new" opens the add form; an employee opens the edit form
  const [formTarget, setFormTarget] = useState<Employee | "new" | null>(null);
  const [deleting, setDeleting] = useState<Employee | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const columns = useMemo(
    () =>
      getColumns({
        onView: (e) => setSelectedId(e.id),
        onEdit: setFormTarget,
        onDelete: setDeleting,
      }),
    [],
  );

  useEffect(() => {
    getEmployees().then(setData);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const save = (values: EmployeeFormValues) => {
    if (!data) return;
    if (formTarget && formTarget !== "new") {
      const { id } = formTarget;
      setData(data.map((e) => (e.id === id ? { ...values, id } : e)));
      setToast(`Updated ${values.name}`);
    } else {
      const next = Math.max(0, ...data.map((e) => Number(e.id.slice(4)))) + 1;
      const id = `EMP-${String(next).padStart(3, "0")}`;
      setData([{ ...values, id }, ...data]);
      setToast(`Added ${values.name}`);
    }
    setFormTarget(null);
  };

  const confirmDelete = () => {
    if (!data || !deleting) return;
    setData(data.filter((e) => e.id !== deleting.id));
    setToast(`Deleted ${deleting.name}`);
    setDeleting(null);
  };

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

  const selected = data?.find((e) => e.id === selectedId);

  if (!data) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div className="space-y-4">
      <Toolbar
        table={table}
        search={search}
        onSearchChange={setSearch}
        onAdd={() => setFormTarget("new")}
      />
      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600 uppercase">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const dir = header.column.getIsSorted();
                  const label = flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  );
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={dir ? ARIA_SORT[dir] : undefined}
                      className="px-4 py-3 font-semibold whitespace-nowrap"
                    >
                      {header.column.getCanSort() ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1 uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          {label}
                          <SortIcon dir={dir} />
                        </button>
                      ) : (
                        <span className="sr-only">{label}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => setSelectedId(row.original.id)}
                className="cursor-pointer hover:bg-zinc-50"
              >
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
      <Drawer
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={selected?.name ?? ""}
      >
        {selected && <EmployeeDetails employee={selected} />}
      </Drawer>
      <Modal
        open={formTarget !== null}
        onClose={() => setFormTarget(null)}
        title={formTarget === "new" ? "Add employee" : "Edit employee"}
      >
        <EmployeeForm
          employee={
            formTarget === "new" ? undefined : (formTarget ?? undefined)
          }
          employees={data}
          onSubmit={save}
          onCancel={() => setFormTarget(null)}
        />
      </Modal>
      <ConfirmDialog
        open={deleting !== null}
        title="Delete employee?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      >
        {deleting?.name} will be removed from the list.
      </ConfirmDialog>
      <Toast message={toast} />
    </div>
  );
}

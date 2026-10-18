import type { Table } from "@tanstack/react-table";
import { Select } from "@/components/ui/Select";
import type { Employee } from "@/lib/schema";

const PAGE_SIZES = [10, 20, 50] as const;

const btn =
  "rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50";

export function Pagination({ table }: { table: Table<Employee> }) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getFilteredRowModel().rows.length;
  const first = total === 0 ? 0 : pageIndex * pageSize + 1;
  const last = Math.min((pageIndex + 1) * pageSize, total);
  const pageCount = Math.max(table.getPageCount(), 1);

  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <p className="text-sm text-zinc-600" aria-live="polite">
        Showing {first}–{last} of {total}
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <Select
          label="Rows per page"
          options={PAGE_SIZES}
          value={pageSize as (typeof PAGE_SIZES)[number]}
          onChange={(v) => v !== "" && table.setPageSize(v)}
        />
        <button
          type="button"
          className={btn}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span className="py-2 text-sm">
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          type="button"
          className={btn}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

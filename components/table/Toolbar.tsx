import type { Table } from "@tanstack/react-table";
import { Select } from "@/components/ui/Select";
import { DEPARTMENTS, STATUSES, type Employee } from "@/lib/schema";

interface ToolbarProps {
  table: Table<Employee>;
  search: string;
  onSearchChange: (value: string) => void;
}

export function Toolbar({ table, search, onSearchChange }: ToolbarProps) {
  const department = table.getColumn("department");
  const status = table.getColumn("status");
  const hasFilters = search !== "" || table.getState().columnFilters.length > 0;

  const clear = () => {
    onSearchChange("");
    table.resetColumnFilters();
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-48 flex-1 flex-col gap-1">
        <label htmlFor="search" className="text-xs font-medium text-zinc-600">
          Search
        </label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Name, email, or role"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        />
      </div>
      <Select
        label="Department"
        placeholder="All departments"
        options={DEPARTMENTS}
        value={(department?.getFilterValue() as string | undefined) ?? ""}
        onChange={(v) => department?.setFilterValue(v || undefined)}
      />
      <Select
        label="Status"
        placeholder="All statuses"
        options={STATUSES}
        value={(status?.getFilterValue() as string | undefined) ?? ""}
        onChange={(v) => status?.setFilterValue(v || undefined)}
      />
      <button
        type="button"
        onClick={clear}
        disabled={!hasFilters}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Clear filters
      </button>
    </div>
  );
}

import { createColumnHelper, type FilterFn } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/Badge";
import type { Employee } from "@/lib/schema";

const col = createColumnHelper<Employee>();

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export const formatDate = (iso: string) => dateFormat.format(new Date(iso));

export interface RowActions {
  onView: (employee: Employee) => void;
}

// Global search matches name, email and role
export const searchFilter: FilterFn<Employee> = (
  row,
  _columnId,
  value: string,
) => {
  const q = value.trim().toLowerCase();
  const { name, email, role } = row.original;
  return [name, email, role].some((f) => f.toLowerCase().includes(q));
};

// equalsString: the default substring match would make "Active" match "Inactive"
export const getColumns = (actions: RowActions) => [
  col.accessor("id", { header: "ID" }),
  col.accessor("name", { header: "Name" }),
  col.accessor("email", { header: "Email" }),
  col.accessor("department", {
    header: "Department",
    filterFn: "equalsString",
  }),
  col.accessor("role", { header: "Role" }),
  col.accessor("status", {
    header: "Status",
    filterFn: "equalsString",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  col.accessor("location", { header: "Location" }),
  col.accessor("startDate", {
    header: "Start date",
    cell: (info) => formatDate(info.getValue()),
  }),
  col.display({
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: (info) => (
      <button
        type="button"
        onClick={() => actions.onView(info.row.original)}
        aria-label={`View ${info.row.original.name}`}
        className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    ),
  }),
];

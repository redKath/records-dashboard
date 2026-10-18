import { createColumnHelper, type FilterFn } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/Badge";
import type { Employee } from "@/lib/schema";

const col = createColumnHelper<Employee>();

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

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
export const columns = [
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
    cell: (info) => dateFormat.format(new Date(info.getValue())),
  }),
];

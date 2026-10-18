import { createColumnHelper } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/Badge";
import type { Employee } from "@/lib/schema";

const col = createColumnHelper<Employee>();

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export const columns = [
  col.accessor("id", { header: "ID" }),
  col.accessor("name", { header: "Name" }),
  col.accessor("email", { header: "Email" }),
  col.accessor("department", { header: "Department" }),
  col.accessor("role", { header: "Role" }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  col.accessor("location", { header: "Location" }),
  col.accessor("startDate", {
    header: "Start date",
    cell: (info) => dateFormat.format(new Date(info.getValue())),
  }),
];

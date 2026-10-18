import { flexRender, type Row } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/Badge";
import type { Employee } from "@/lib/schema";
import { formatDate } from "./columns";

interface EmployeeCardProps {
  row: Row<Employee>;
  onOpen: () => void;
}

// Mobile layout for a row; shares the table's action buttons
export function EmployeeCard({ row, onOpen }: EmployeeCardProps) {
  const e = row.original;
  const actions = row.getVisibleCells().find((c) => c.column.id === "actions");

  return (
    <li
      onClick={onOpen}
      className="cursor-pointer space-y-2 rounded-lg border border-zinc-200 p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold">{e.name}</p>
          <p className="text-sm text-zinc-600">{e.role}</p>
        </div>
        <StatusBadge status={e.status} />
      </div>
      <p className="text-sm break-all text-zinc-600">{e.email}</p>
      <p className="text-sm text-zinc-600">
        {e.department} · {e.location} · Since {formatDate(e.startDate)}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{e.id}</span>
        {actions &&
          flexRender(actions.column.columnDef.cell, actions.getContext())}
      </div>
    </li>
  );
}

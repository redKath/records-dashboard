import type { Employee } from "@/lib/schema";

const STYLES: Record<Employee["status"], string> = {
  Active: "bg-green-100 text-green-800 ring-green-600/20",
  "On Leave": "bg-amber-100 text-amber-800 ring-amber-600/20",
  Inactive: "bg-zinc-100 text-zinc-700 ring-zinc-500/20",
};

export function StatusBadge({ status }: { status: Employee["status"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}

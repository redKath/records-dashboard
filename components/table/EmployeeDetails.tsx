import { StatusBadge } from "@/components/ui/Badge";
import type { Employee } from "@/lib/schema";
import { formatDate } from "./columns";

export function EmployeeDetails({ employee }: { employee: Employee }) {
  const rows: [string, React.ReactNode][] = [
    ["ID", employee.id],
    ["Email", employee.email],
    ["Department", employee.department],
    ["Role", employee.role],
    ["Status", <StatusBadge key="status" status={employee.status} />],
    ["Location", employee.location],
    ["Start date", formatDate(employee.startDate)],
  ];

  return (
    <dl className="divide-y divide-zinc-100 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-3 gap-2 py-3">
          <dt className="text-zinc-500">{label}</dt>
          <dd className="col-span-2 break-words">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

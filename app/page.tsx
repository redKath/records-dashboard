import { EmployeeTable } from "@/components/table/EmployeeTable";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-4 p-4 md:p-6">
      <h1 className="text-2xl font-semibold">Employee Records</h1>
      <EmployeeTable />
    </main>
  );
}

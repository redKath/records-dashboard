import { EmployeeTable } from "@/components/table/EmployeeTable";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Employee Records</h1>
      <EmployeeTable />
    </main>
  );
}

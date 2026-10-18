import rawEmployees from "@/data/employees.json";
import { employeeSchema, type Employee } from "./schema";

const LATENCY_MS = 500;

export async function getEmployees(): Promise<Employee[]> {
  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
  return employeeSchema.array().parse(rawEmployees);
}

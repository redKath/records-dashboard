import { z } from "zod";

export const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
] as const;

export const STATUSES = ["Active", "On Leave", "Inactive"] as const;

export const employeeSchema = z.object({
  id: z.string().regex(/^EMP-\d{3,}$/),
  name: z.string().trim().min(2).max(80),
  email: z.email(),
  department: z.enum(DEPARTMENTS),
  role: z.string().trim().min(1),
  status: z.enum(STATUSES),
  location: z.string().min(1),
  startDate: z.iso.date(),
});

export type Employee = z.infer<typeof employeeSchema>;

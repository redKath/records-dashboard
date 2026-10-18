import { z } from "zod";

export const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
] as const;

export const STATUSES = ["Active", "On Leave", "Inactive"] as const;

const maxStartDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

export const employeeSchema = z.object({
  id: z.string().regex(/^EMP-\d{3,}$/),
  name: z
    .string()
    .trim()
    .min(2, "Name must be 2–80 characters")
    .max(80, "Name must be 2–80 characters"),
  email: z.email("Enter a valid email address"),
  department: z.enum(DEPARTMENTS, { error: "Select a department" }),
  role: z.string().trim().min(1, "Role is required"),
  status: z.enum(STATUSES, { error: "Select a status" }),
  location: z.string().trim().min(1, "Location is required"),
  startDate: z.iso
    .date({ error: "Start date is required" })
    .refine(
      (d) => d <= maxStartDate(),
      "Start date can't be more than 1 year in the future",
    ),
});

export type Employee = z.infer<typeof employeeSchema>;

export const employeeFormSchema = employeeSchema.omit({ id: true });

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

/** Form schema that also rejects emails already used by other employees */
export const makeEmployeeFormSchema = (takenEmails: string[]) =>
  employeeFormSchema.extend({
    email: employeeSchema.shape.email.refine(
      (email) => !takenEmails.includes(email.toLowerCase()),
      "Email is already in use",
    ),
  });

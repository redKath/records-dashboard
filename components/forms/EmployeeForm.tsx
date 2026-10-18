"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DEPARTMENTS,
  STATUSES,
  makeEmployeeFormSchema,
  type Employee,
  type EmployeeFormValues,
} from "@/lib/schema";
import { SelectField, TextField } from "./Field";

// Selects start unselected, so the empty strings are not valid enum values
const EMPTY = {
  name: "",
  email: "",
  department: "",
  role: "",
  status: "",
  location: "",
  startDate: "",
} as unknown as EmployeeFormValues;

interface EmployeeFormProps {
  /** Employee being edited; omit to add a new one */
  employee?: Employee;
  employees: Employee[];
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel: () => void;
}

export function EmployeeForm({
  employee,
  employees,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const schema = useMemo(
    () =>
      makeEmployeeFormSchema(
        employees
          .filter((e) => e.id !== employee?.id)
          .map((e) => e.email.toLowerCase()),
      ),
    [employees, employee?.id],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: employee ?? EMPTY,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <TextField
        label="Name"
        autoComplete="off"
        error={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Email"
        type="email"
        autoComplete="off"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Department"
          placeholder="Select department"
          options={DEPARTMENTS}
          error={errors.department?.message}
          {...register("department")}
        />
        <SelectField
          label="Status"
          placeholder="Select status"
          options={STATUSES}
          error={errors.status?.message}
          {...register("status")}
        />
      </div>
      <TextField
        label="Role"
        autoComplete="off"
        error={errors.role?.message}
        {...register("role")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Location"
          autoComplete="off"
          error={errors.location?.message}
          {...register("location")}
        />
        <TextField
          label="Start date"
          type="date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Cancel
        </button>
        {/* aria-disabled instead of disabled: a click still validates and focuses the first invalid field */}
        <button
          type="submit"
          aria-disabled={!isValid}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          {employee ? "Save changes" : "Add employee"}
        </button>
      </div>
    </form>
  );
}

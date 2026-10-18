import { useId, type ComponentProps, type ReactNode } from "react";

interface FieldProps {
  label: string;
  error?: string;
}

const control =
  "w-full rounded-md border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function Shell({
  id,
  label,
  error,
  children,
}: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const a11y = (id: string, error?: string) => ({
  id,
  "aria-invalid": !!error,
  "aria-describedby": error ? `${id}-error` : undefined,
});

const border = (error?: string) =>
  error ? "border-red-500" : "border-zinc-300";

export function TextField({
  label,
  error,
  ...props
}: FieldProps & ComponentProps<"input">) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error}>
      <input
        {...props}
        {...a11y(id, error)}
        className={`${control} ${border(error)}`}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  error,
  placeholder,
  options,
  ...props
}: FieldProps &
  ComponentProps<"select"> & {
    placeholder: string;
    options: readonly string[];
  }) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error}>
      <select
        {...props}
        {...a11y(id, error)}
        className={`${control} ${border(error)}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Shell>
  );
}

import { useId } from "react";

interface SelectProps<T extends string | number> {
  label: string;
  value: T | "";
  options: readonly T[];
  onChange: (value: T | "") => void;
  /** Label for the empty option; omit to require a value */
  placeholder?: string;
}

export function Select<T extends string | number>({
  label,
  value,
  options,
  onChange,
  placeholder,
}: SelectProps<T>) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-zinc-600">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          const picked = options.find((o) => String(o) === e.target.value);
          onChange(picked ?? "");
        }}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

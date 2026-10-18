// The live region stays mounted so screen readers announce messages as they appear
export function Toast({ message }: { message: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 left-4 flex justify-end"
    >
      {message && (
        <p className="rounded-md bg-zinc-900 px-4 py-3 text-sm text-white shadow-lg">
          {message}
        </p>
      )}
    </div>
  );
}

import type { ReactNode } from "react";
type Props = { id: string; label: string; error?: string; hint?: string; required?: boolean; children: (a: { id: string; "aria-describedby"?: string; "aria-invalid": boolean; className: string }) => ReactNode };
export function FormField({ id, label, error, hint, required = true, children }: Props) {
  const desc = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}{required ? <span className="text-maroon"> *<span className="sr-only"> required</span></span> : <span className="text-muted"> (optional)</span>}</label>
      {children({ id, "aria-describedby": desc, "aria-invalid": !!error, className: `min-h-11 w-full border bg-white px-3 py-2 ${error ? "border-red-700" : "border-champagne"}` })}
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1 text-sm font-medium text-red-800"><span aria-hidden="true">! </span>{error}</p>}
    </div>
  );
}

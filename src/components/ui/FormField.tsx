import { ChevronDown } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";

type FieldShell = { label: string; hint?: string; error?: string; required?: boolean; children: (id: string, describedBy?: string) => ReactNode };

function Shell({ label, hint, error, required, children }: FieldShell) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-danger" aria-hidden="true"> *</span>}
      </label>
      {children(id, describedBy)}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const control =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/70 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-danger";

type Base = { label: string; hint?: string; error?: string };

export function TextField({ label, hint, error, required, className = "", ...props }: Base & ComponentProps<"input">) {
  return (
    <Shell label={label} hint={hint} error={error} required={required}>
      {(id, d) => (
        <input id={id} required={required} aria-invalid={!!error} aria-describedby={d} className={`${control} ${className}`} {...props} />
      )}
    </Shell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  ...props
}: Base & ComponentProps<"select"> & { options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <Shell label={label} hint={hint} error={error} required={required}>
      {(id, d) => (
        <div className="relative">
          <select id={id} required={required} aria-invalid={!!error} aria-describedby={d} className={`${control} appearance-none pr-10`} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          </div>
      )}
    </Shell>
  );
}

export function TextAreaField({ label, hint, error, required, ...props }: Base & ComponentProps<"textarea">) {
  return (
    <Shell label={label} hint={hint} error={error} required={required}>
      {(id, d) => <textarea id={id} required={required} aria-invalid={!!error} aria-describedby={d} rows={5} className={control} {...props} />}
    </Shell>
  );
}

export function CheckboxField({ label, error, ...props }: { label: ReactNode; error?: string } & ComponentProps<"input">) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input id={id} type="checkbox" aria-invalid={!!error} className="mt-1 h-5 w-5 shrink-0 accent-[var(--oph-primary)]" {...props} />
        <label htmlFor={id} className="text-sm text-ink">
          {label}
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Groupe de boutons radio présentés en « cartes », utilisé par le simulateur et la connexion. */
export function RadioCards({
  legend,
  name,
  value,
  onChange,
  options,
  error,
}: {
  legend: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; description?: string }[];
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex cursor-pointer flex-col gap-1 rounded-[var(--radius-card)] border-2 p-4 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent ${
              value === o.value ? "border-primary bg-primary-light" : "border-line bg-white hover:border-primary/50"
            }`}
          >
            <span className="flex items-center gap-2 font-semibold text-ink">
              <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="h-4 w-4 accent-[var(--oph-primary)]" />
              {o.label}
            </span>
            {o.description && <span className="pl-6 text-sm text-muted">{o.description}</span>}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

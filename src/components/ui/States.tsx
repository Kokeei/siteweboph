import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function LoadingState({ label = "Chargement en cours…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({ title = "Une erreur est survenue", message, action }: { title?: string; message: string; action?: ReactNode }) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-danger/30 bg-danger/5 px-6 py-10 text-center">
      <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
      <p className="font-heading text-lg font-bold text-ink">{title}</p>
      <p className="max-w-md text-muted">{message}</p>
      {action}
    </div>
  );
}

export function EmptyState({ title, message, action }: { title: string; message?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line bg-surface px-6 py-12 text-center">
      <Inbox className="h-8 w-8 text-muted" aria-hidden="true" />
      <p className="font-heading text-lg font-bold text-ink">{title}</p>
      {message && <p className="max-w-md text-muted">{message}</p>}
      {action}
    </div>
  );
}

import { ApplicationSteps } from "@/components/home/ApplicationSteps";
import { formatDate } from "@/lib/format";
import type { RequestStatus } from "@/services/api";

export function RequestStatusView({ status }: { status: RequestStatus }) {
  return (
    <div className="space-y-8">
      <dl className="grid gap-4 rounded-[var(--radius-card)] bg-primary-light/60 p-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">N° de dossier</dt>
          <dd className="font-heading text-lg font-bold text-primary">{status.dossier}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Aide demandée</dt>
          <dd className="font-semibold text-ink">{status.aid}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Déposé le</dt>
          <dd className="font-semibold text-ink">{formatDate(status.submittedAt)}</dd>
        </div>
      </dl>
      <ApplicationSteps current={status.currentStep} linked={false} />
      <div>
        <h3 className="mb-4 text-lg font-bold text-primary">Historique</h3>
        <ol className="relative space-y-4 border-l-2 border-line pl-6">
          {status.history.map((h) => (
            <li key={h.date + h.label} className="relative">
              <span aria-hidden="true" className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-secondary" />
              <time dateTime={h.date} className="block text-xs font-semibold text-muted">{formatDate(h.date)}</time>
              <span className="text-ink">{h.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

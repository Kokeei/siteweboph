import Link from "next/link";
import { applicationSteps } from "@/data/steps";

/**
 * Parcours de demande en 4 étapes (Simulation → Dossier → Validation → Suivi).
 * `current` permet de réutiliser le composant comme indicateur d'avancement (suivi de dossier).
 */
export function ApplicationSteps({ current, linked = true }: { current?: number; linked?: boolean }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      <span aria-hidden="true" className="absolute left-7 top-7 hidden h-[3px] w-[calc(100%-3.5rem)] bg-line md:block" />
      {applicationSteps.map((s, i) => {
        const done = current !== undefined && i < current;
        const active = current !== undefined && i === current;
        const circle = done ? "bg-secondary text-white" : active ? "bg-accent text-white ring-4 ring-accent/25" : current !== undefined ? "bg-white text-muted border-2 border-line" : "bg-primary text-white";
        const inner = (
          <>
            <span className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-xl font-extrabold ${circle}`}>{i + 1}</span>
            <span>
              <span className="block font-heading text-lg font-bold text-primary">{s.title}</span>
              <span className="mt-1 block text-sm text-muted">{s.text}</span>
              {active && <span className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent-dark">Étape en cours</span>}
            </span>
          </>
        );
        return (
          <li key={s.id} aria-current={active ? "step" : undefined}>
            {linked ? (
              <Link href={s.href} className="group flex gap-4 md:flex-col md:items-start">
                {inner}
              </Link>
            ) : (
              <div className="flex gap-4 md:flex-col md:items-start">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

import { AlertTriangle, Info } from "lucide-react";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { HousingCard } from "@/components/cards/HousingCard";
import { ApplicationSteps } from "@/components/home/ApplicationSteps";
import { documents } from "@/data/documents";
import type { ContentBlock } from "@/data/pages";
import { residences } from "@/data/residences";
import { CTA } from "./CTA";

/** Rend les blocs structurés d'une page de contenu. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-oph">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "callout": {
            const Icon = b.tone === "warning" ? AlertTriangle : Info;
            const cls = b.tone === "warning" ? "border-accent bg-accent/10" : "border-secondary bg-secondary-light";
            return (
              <aside key={i} className={`my-6 flex gap-4 rounded-r-[var(--radius-card)] border-l-4 p-5 ${cls}`}>
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${b.tone === "warning" ? "text-accent-dark" : "text-secondary"}`} aria-hidden="true" />
                <div>
                  <p className="!mb-1 font-bold">{b.title}</p>
                  <p className="!mb-0 text-[0.95rem]">{b.text}</p>
                </div>
              </aside>
            );
          }
          case "steps":
            return (
              <div key={i} className="not-prose my-8 rounded-[var(--radius-card)] bg-primary-light/60 p-6 md:p-8">
                <ApplicationSteps />
              </div>
            );
          case "documents":
            return (
              <div key={i} className="my-6 grid gap-4">
                {documents
                  .filter((d) => !b.category || d.category === b.category)
                  .map((d) => (
                    <DocumentCard key={d.id} doc={d} />
                  ))}
              </div>
            );
          case "residences":
            return (
              <div key={i} className="my-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {residences.map((r) => (
                  <HousingCard key={r.id} residence={r} />
                ))}
              </div>
            );
          case "figures":
            return (
              <dl key={i} className="my-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {b.items.map((f) => (
                  <div key={f.label} className="rounded-[var(--radius-card)] bg-white p-5 text-center shadow-[var(--shadow-card)]">
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-heading text-2xl font-extrabold text-primary md:text-3xl">{f.value}</dd>
                    <dd className="mt-1 text-sm text-muted">{f.label}</dd>
                  </div>
                ))}
              </dl>
            );
          case "cta":
            return (
              <div key={i} className="mt-12">
                <CTA title={b.title} text={b.text} href={b.href} label={b.label} />
              </div>
            );
        }
      })}
    </div>
  );
}

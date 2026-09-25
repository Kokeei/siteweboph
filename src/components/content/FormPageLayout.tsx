import type { ReactNode } from "react";
import type { Crumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "./PageHero";

/** Gabarit des pages de démarches : bandeau + formulaire centré + encart d'aide optionnel. */
export function FormPageLayout({ title, intro, crumbs, image, aside, children }: { title: string; intro?: string; crumbs: Crumb[]; image?: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} intro={intro} crumbs={crumbs} image={image ?? "/images/eservices.svg"} />
      <div className="bg-surface">
        <div className={`container-oph grid gap-8 py-12 md:py-16 ${aside ? "lg:grid-cols-[1fr_320px]" : "max-w-4xl"}`}>
          <div className="min-w-0">{children}</div>
          {aside && <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">{aside}</aside>}
        </div>
      </div>
    </>
  );
}

export function HelpCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
      <p className="font-heading text-base font-bold text-primary">{title}</p>
      <div className="mt-2 space-y-2 text-sm text-muted">{children}</div>
    </div>
  );
}

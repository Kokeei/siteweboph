import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/PageHero";
import { EmptyState } from "@/components/ui/States";
import { SearchBar } from "@/components/ui/SearchBar";
import { search } from "@/lib/search";

export const metadata: Metadata = { title: "Recherche", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const q = ((await searchParams).q ?? "").slice(0, 100);
  const hits = search(q);
  return (
    <>
      <PageHero title="Recherche" crumbs={[{ label: "Recherche" }]} />
      <div className="container-oph max-w-4xl py-12 md:py-16">
        <SearchBar defaultValue={q} />
        <div className="mt-10" aria-live="polite">
          {!q ? (
            <EmptyState title="Que recherchez-vous ?" message="Saisissez un mot-clé : Fare OPH, simulation, agence, étudiant…" />
          ) : hits.length === 0 ? (
            <EmptyState title="Aucun résultat" message={`Aucun contenu ne correspond à « ${q} ».`} />
          ) : (
            <>
              <p className="mb-6 text-sm text-muted">{hits.length} résultat{hits.length > 1 ? "s" : ""} pour « {q} »</p>
              <ul className="space-y-4">
                {hits.map((h) => (
                  <li key={h.href + h.title}>
                    <Link href={h.href} className="block rounded-[var(--radius-card)] border border-line bg-white p-5 transition hover:border-primary hover:shadow-[var(--shadow-card)]">
                      <span className="text-xs font-bold uppercase tracking-wide text-secondary">{h.type}</span>
                      <span className="mt-1 block text-lg font-bold text-primary">{h.title}</span>
                      <span className="mt-1 block text-sm text-muted">{h.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

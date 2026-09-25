import type { Metadata } from "next";
import { NewsCard } from "@/components/cards/NewsCard";
import { PageHero } from "@/components/content/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { sortedArticles, type Article } from "@/data/articles";

export const metadata: Metadata = {
  title: "Tous nos articles & évènement",
  description: "Toute l'actualité et les évènements de l'Office Polynésien de l'Habitat.",
  alternates: { canonical: "/articles" },
};

const PER_PAGE = 6;
const categories: (Article["category"] | "Tous")[] = ["Tous", "Actualité", "Évènement", "Alerte"];

type Props = { searchParams: Promise<{ page?: string; categorie?: string }> };

export default async function ArticlesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const cat = categories.find((c) => c === sp.categorie) ?? "Tous";
  const list = cat === "Tous" ? sortedArticles : sortedArticles.filter((a) => a.category === cat);
  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), totalPages);
  const items = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const base = cat === "Tous" ? "/articles" : `/articles?categorie=${encodeURIComponent(cat)}`;

  return (
    <>
      <PageHero title="Actualités & évènements" intro="Suivez l'actualité de l'Office Polynésien de l'Habitat." crumbs={[{ label: "Actualités & évènements" }]} />
      <div className="container-oph py-12 md:py-16">
        <nav aria-label="Filtrer par catégorie" className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c}>
                <a
                  href={c === "Tous" ? "/articles" : `/articles?categorie=${encodeURIComponent(c)}`}
                  aria-current={c === cat ? "true" : undefined}
                  className={`inline-block rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition ${c === cat ? "border-primary bg-primary text-white" : "border-line text-ink hover:border-primary hover:text-primary"}`}
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {items.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <li key={a.slug}>
                <NewsCard article={a} headingLevel={2} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Aucun article" message="Aucune actualité ne correspond à cette catégorie." action={<ButtonLink href="/articles" variant="outline" size="sm">Voir toutes les actualités</ButtonLink>} />
        )}
        <Pagination page={page} totalPages={totalPages} basePath={base} />
      </div>
    </>
  );
}

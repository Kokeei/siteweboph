import Link from "next/link";
import { PageHero } from "@/components/content/PageHero";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { mainNav } from "@/data/navigation";
import type { ContentPage } from "@/data/pages";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

/** Gabarit commun des pages de contenu : bandeau, contenu principal, colonne latérale (rubrique + contact). */
export function ContentPageView({ page, path }: { page: ContentPage; path: string }) {
  const crumbs = [...(page.parent ? [{ label: page.parent.label }] : []), { label: page.shortTitle ?? page.title }];
  const section = mainNav.find((n) => n.children?.some((c) => c.href === path));
  return (
    <>
      <PageHero title={page.title} intro={page.description} image={page.image} crumbs={crumbs} />
      <div className="container-oph grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <ContentBlocks blocks={page.blocks} />
        </article>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Informations complémentaires">
          {section && (
            <nav aria-label={`Rubrique ${section.label}`} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
              <p className="mb-3 font-heading text-base font-bold text-primary">{section.label}</p>
              <ul className="space-y-1">
                {section.children!.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      aria-current={c.href === path ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${c.href === path ? "bg-primary text-white" : "text-ink hover:bg-primary-light"}`}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="rounded-[var(--radius-card)] bg-primary p-6 text-white">
            <p className="font-heading text-lg font-bold">Une question ?</p>
            <p className="mt-2 text-sm text-white/90">Nos conseillers vous répondent du lundi au vendredi.</p>
            <a href={site.phoneHref} className="mt-4 block font-heading text-2xl font-extrabold hover:underline">
              {site.phone}
            </a>
            <ButtonLink href="/nous-contacter" variant="accent" size="sm" className="mt-4">
              Nous écrire
            </ButtonLink>
          </div>
        </aside>
      </div>
    </>
  );
}

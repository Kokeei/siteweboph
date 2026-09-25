import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/PageHero";
import { legalNav, mainNav } from "@/data/navigation";

export const metadata: Metadata = { title: "Plan du site", alternates: { canonical: "/plan-du-site" } };

export default function SitemapPage() {
  return (
    <>
      <PageHero title="Plan du site" crumbs={[{ label: "Plan du site" }]} />
      <div className="container-oph grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {mainNav.map((n) => (
          <section key={n.label}>
            <h2 className="text-lg font-bold text-primary"><Link href={n.href}>{n.label}</Link></h2>
            {n.children && (
              <ul className="mt-3 space-y-2 border-l-2 border-line pl-4">
                {n.children.map((c) => <li key={c.href}><Link href={c.href} className="hover:text-primary hover:underline">{c.label}</Link></li>)}
              </ul>
            )}
          </section>
        ))}
        <section>
          <h2 className="text-lg font-bold text-primary">Informations</h2>
          <ul className="mt-3 space-y-2 border-l-2 border-line pl-4">
            {legalNav.map((c) => <li key={c.href}><Link href={c.href} className="hover:text-primary hover:underline">{c.label}</Link></li>)}
          </ul>
        </section>
      </div>
    </>
  );
}

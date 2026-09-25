import type { Metadata } from "next";
import { AgencyCard } from "@/components/cards/AgencyCard";
import { CTA } from "@/components/content/CTA";
import { PageHero } from "@/components/content/PageHero";
import { agencies } from "@/data/agencies";

export const metadata: Metadata = {
  title: "Nos agences",
  description: "Adresses, téléphones et horaires des agences de l'Office Polynésien de l'Habitat à Pirae, Papeete et Taravao.",
  alternates: { canonical: "/nos-agences" },
};

export default function AgenciesPage() {
  return (
    <>
      <PageHero title="Nos agences" intro="Nos équipes vous accueillent à Pirae, Papeete et Taravao." image="/images/agence.svg" crumbs={[{ label: "L'OPH" }, { label: "Nos agences" }]} />
      <div className="container-oph py-12 md:py-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agencies.map((a) => (
            <li key={a.id}>
              <AgencyCard agency={a} />
            </li>
          ))}
        </ul>
        <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line">
          <iframe
            title="Carte de Pirae (emplacement indicatif du siège)"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-149.56%2C-17.56%2C-149.51%2C-17.52&layer=mapnik&marker=-17.5395%2C-149.5390"
            className="h-[360px] w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-14">
          <CTA title="Vous ne pouvez pas vous déplacer ?" text="Écrivez-nous, un conseiller vous répondra dans les meilleurs délais." href="/nous-contacter" label="Nous contacter" />
        </div>
      </div>
    </>
  );
}

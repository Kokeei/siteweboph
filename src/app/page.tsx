import { ServiceCard } from "@/components/cards/ServiceCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { CTA } from "@/components/content/CTA";
import { ContactSection } from "@/components/content/ContactSection";
import { ApplicationSteps } from "@/components/home/ApplicationSteps";
import { Hero } from "@/components/home/Hero";
import { QuickAccess } from "@/components/home/QuickAccess";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { sortedArticles } from "@/data/articles";
import { services } from "@/data/services";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Ensemble, construisons votre projet de logement"
        subtitle="Habitat groupé, Fare OPH, aide en matériaux, hébergements étudiants : découvrez les aides de l'Office Polynésien de l'Habitat et faites votre demande en ligne."
        image="/images/hero.svg"
      />
      <QuickAccess />

      <section className="py-16 md:py-24" aria-labelledby="aides-title">
        <div className="container-oph">
          <SectionTitle id="aides-title" kicker="Nos aides" title="Trouvez la solution adaptée à votre famille">
              L&apos;OPH accompagne les familles polynésiennes, qu&apos;elles disposent ou non d&apos;un terrain.
            </SectionTitle>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.href}>
                <ServiceCard {...s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary-light/60 py-16 md:py-24" aria-labelledby="parcours-title">
        <div className="container-oph">
          <SectionTitle id="parcours-title" kicker="Demande d'aide au logement" title="Comment faire ma demande ?">
              Un parcours simple, en ligne, en quatre étapes.
            </SectionTitle>
          <ApplicationSteps />
          <div className="mt-12 flex justify-center">
            <ButtonLink href="/simulation" variant="accent" size="lg">
              Commencer ma simulation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="actus-title">
        <div className="container-oph">
          <SectionTitle id="actus-title" kicker="Actualités & évènements" title="Les dernières nouvelles de l'OPH" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedArticles.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <NewsCard article={a} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/articles" variant="outline">
              Voir plus d&apos;actualités
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Fare Tropical">
        <div className="container-oph">
          <CTA
            variant="accent"
            title="Fare Tropical par OPH"
            text="Des fare en bois et en béton, du T1 au T5, vendus en kits et sans condition de ressources."
            href="/acheteur/nos-fare-oph-pour-tout-le-monde"
            label="Découvrir les kits"
          />
        </div>
      </section>

      <ContactSection />
    </>
  );
}

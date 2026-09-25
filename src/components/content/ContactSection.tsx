import { Mail, Phone } from "lucide-react";
import { AgencyCard } from "@/components/cards/AgencyCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { agencies } from "@/data/agencies";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <section className="bg-surface py-16 md:py-24" aria-label="Contact et agences">
      <div className="container-oph">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="[&>div]:mb-0">
            <SectionTitle kicker="Nous rencontrer" title="Nos agences" align="left" />
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref} variant="outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </ButtonLink>
            <ButtonLink href="/nous-contacter" variant="primary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Nous écrire
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agencies.map((a) => (
            <AgencyCard key={a.id} agency={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

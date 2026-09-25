import { Clock, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { FormPageLayout, HelpCard } from "@/components/content/FormPageLayout";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'Office Polynésien de l'Habitat : formulaire, téléphone, adresse et horaires.",
  alternates: { canonical: "/nous-contacter" },
};

export default function ContactPage() {
  return (
    <FormPageLayout
      title="Nous contacter"
      intro="Une question sur une aide, votre dossier ou votre logement ? Écrivez-nous."
      crumbs={[{ label: "Contact" }]}
      image="/images/agence.svg"
      aside={
        <HelpCard title="Siège de l'OPH">
          <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{site.address.street}, {site.address.city} – {site.address.postal}</p>
          <p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><a href={site.phoneHref} className="font-semibold text-primary">{site.phone}</a></p>
          <p className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><span>{site.hours.map((h) => <span key={h.days} className="block">{h.days} : {h.time}</span>)}</span></p>
        </HelpCard>
      }
    >
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
        <ContactForm />
      </div>
    </FormPageLayout>
  );
}

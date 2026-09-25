import type { Metadata } from "next";
import Link from "next/link";
import { FormPageLayout, HelpCard } from "@/components/content/FormPageLayout";
import { EligibilitySimulator } from "@/components/forms/EligibilitySimulator";

export const metadata: Metadata = {
  title: "Simulation",
  description: "Simulez en ligne votre éligibilité aux aides au logement de l'OPH : habitat groupé, Fare OPH, aide en matériaux.",
  alternates: { canonical: "/simulation" },
};

export default function SimulationPage() {
  return (
    <FormPageLayout
      title="Simulation d'éligibilité"
      intro="Vérifiez en quelques minutes si votre foyer peut bénéficier d'une aide de l'OPH."
      crumbs={[{ label: "Demandes d'aide" }, { label: "Simulation" }]}
      aside={
        <>
          <HelpCard title="Bon à savoir">
            <p>L&apos;éligibilité est basée non seulement sur les revenus du foyer mais aussi sur la situation socio-économique globale de la famille.</p>
          </HelpCard>
          <HelpCard title="Et ensuite ?">
            <p>Si vous êtes éligible, <Link href="/dossier" className="font-semibold text-primary underline">déposez votre dossier en ligne</Link> ou téléchargez le <Link href="/p/formulaires" className="font-semibold text-primary underline">formulaire papier</Link>.</p>
          </HelpCard>
        </>
      }
    >
      <EligibilitySimulator />
    </FormPageLayout>
  );
}

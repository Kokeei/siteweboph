import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FormPageLayout, HelpCard } from "@/components/content/FormPageLayout";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { LoadingState } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Dossier de demande",
  description: "Déposez en ligne votre dossier de demande d'aide au logement auprès de l'OPH.",
  alternates: { canonical: "/dossier" },
};

export default function DossierPage() {
  return (
    <FormPageLayout
      title="Dossier de demande"
      intro="Remplissez et soumettez votre dossier de demande d'aide au logement en ligne."
      crumbs={[{ label: "Demandes d'aide" }, { label: "Dossier de demande" }]}
      aside={
        <>
          <HelpCard title="Avant de commencer">
            <p>Avez-vous fait votre <Link href="/simulation" className="font-semibold text-primary underline">simulation d&apos;éligibilité</Link> ?</p>
            <p>Préparez vos pièces justificatives numérisées (PDF ou JPG, 2 Mo maximum chacune).</p>
          </HelpCard>
          <HelpCard title="Vous préférez le papier ?">
            <p>Téléchargez le <Link href="/p/formulaires" className="font-semibold text-primary underline">formulaire de demande</Link> et déposez-le dans l&apos;une de nos agences.</p>
          </HelpCard>
        </>
      }
    >
      <Suspense fallback={<LoadingState />}>
        <ApplicationForm />
      </Suspense>
    </FormPageLayout>
  );
}

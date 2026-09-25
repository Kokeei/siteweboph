import type { Metadata } from "next";
import { FormPageLayout } from "@/components/content/FormPageLayout";
import { TrackingForm } from "@/components/forms/TrackingForm";

export const metadata: Metadata = {
  title: "Suivi de demande",
  description: "Suivez l'avancement de votre demande d'aide au logement auprès de l'OPH.",
  alternates: { canonical: "/suivi" },
};

export default function SuiviPage() {
  return (
    <FormPageLayout title="Suivi de demande" intro="Avec vos identifiants, suivez l'avancement de votre demande." crumbs={[{ label: "Demandes d'aide" }, { label: "Suivi de demande" }]}>
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
        <TrackingForm />
      </div>
    </FormPageLayout>
  );
}

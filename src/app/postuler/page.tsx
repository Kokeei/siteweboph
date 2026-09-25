import type { Metadata } from "next";
import { FormPageLayout } from "@/components/content/FormPageLayout";
import { ApplyJobForm } from "@/components/forms/ApplyJobForm";

export const metadata: Metadata = {
  title: "Postuler",
  description: "Rejoignez les équipes de l'Office Polynésien de l'Habitat.",
  alternates: { canonical: "/postuler" },
};

export default function PostulerPage() {
  return (
    <FormPageLayout title="Postuler" intro="Vous souhaitez rejoindre l'OPH ? Déposez votre candidature." crumbs={[{ label: "L'OPH" }, { label: "Postuler" }]} image="/images/agence.svg">
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
        <ApplyJobForm />
      </div>
    </FormPageLayout>
  );
}

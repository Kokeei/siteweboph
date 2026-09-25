import type { Metadata } from "next";
import Link from "next/link";
import { FormPageLayout, HelpCard } from "@/components/content/FormPageLayout";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Connexion à votre Espace",
  description: "Connectez-vous à votre espace OPH avec votre numéro de dossier et votre mot de passe.",
  alternates: { canonical: "/connexion" },
  robots: { index: false },
};

export default function ConnexionPage() {
  return (
    <FormPageLayout
      title="Connexion à votre Espace"
      intro="Sélectionnez votre profil puis saisissez votre numéro de dossier et votre mot de passe."
      crumbs={[{ label: "Mon espace" }]}
      aside={
        <>
          <HelpCard title="Pas encore de dossier ?">
            <p>Commencez par une <Link href="/simulation" className="font-semibold text-primary underline">simulation d&apos;éligibilité</Link>.</p>
          </HelpCard>
          <HelpCard title="Identifiants perdus ?">
            <p>Contactez votre agence ou <Link href="/nous-contacter" className="font-semibold text-primary underline">écrivez-nous</Link>.</p>
          </HelpCard>
        </>
      }
    >
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
        <LoginForm />
      </div>
    </FormPageLayout>
  );
}

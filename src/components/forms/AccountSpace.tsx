"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState, LoadingState } from "@/components/ui/States";
import { documents } from "@/data/documents";
import { clearSession, readSession, type DemoSession } from "@/services/session";
import { RequestStatusView } from "./RequestStatusView";

export function AccountSpace() {
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null | undefined>(undefined);

  useEffect(() => setSession(readSession()), []);

  if (session === undefined) return <LoadingState />;
  if (!session)
    return <EmptyState title="Vous n'êtes pas connecté" message="Connectez-vous pour accéder au suivi de votre dossier." action={<ButtonLink href="/connexion">Me connecter</ButtonLink>} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 rounded-[var(--radius-card)] bg-primary p-6 text-white sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-white/80">Espace {session.profile}</p>
          <p className="font-heading text-xl font-bold">Ia ora na, {session.applicant}</p>
        </div>
        <Button variant="white" size="sm" onClick={() => { clearSession(); router.push("/connexion"); }}>
          <LogOut className="h-4 w-4" aria-hidden="true" /> Se déconnecter
        </Button>
      </div>
      <section className="rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-8" aria-labelledby="suivi-title">
        <h2 id="suivi-title" className="mb-6 text-xl font-bold text-primary">Suivi de ma demande</h2>
        <RequestStatusView status={session} />
      </section>
      <section aria-labelledby="docs-title">
        <h2 id="docs-title" className="mb-4 text-xl font-bold text-primary">Mes documents</h2>
        <div className="grid gap-4">
          {documents.slice(0, 2).map((d) => <DocumentCard key={d.id} doc={d} />)}
        </div>
      </section>
    </div>
  );
}

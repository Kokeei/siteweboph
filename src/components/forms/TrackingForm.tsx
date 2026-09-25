"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/FormField";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { trackRequest, type RequestStatus } from "@/services/api";
import { RequestStatusView } from "./RequestStatusView";
import { useSubmit } from "./useSubmit";

export function TrackingForm() {
  const [dossier, setDossier] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errors, setErrors] = useState<{ dossier?: string; birthDate?: string }>({});
  const s = useSubmit<RequestStatus>();

  if (s.status === "loading") return <LoadingState label="Recherche de votre dossier…" />;
  if (s.status === "success" && s.data)
    return (
      <div className="space-y-6">
        <RequestStatusView status={s.data} />
        <Button variant="outline" onClick={s.reset}>Rechercher un autre dossier</Button>
      </div>
    );

  return (
    <div className="space-y-6">
      {s.status === "error" && <ErrorState title="Dossier introuvable" message={s.error ?? ""} />}
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const err: typeof errors = {};
          if (!dossier.trim()) err.dossier = "Le numéro de dossier est obligatoire.";
          if (!birthDate) err.birthDate = "La date de naissance est obligatoire.";
          setErrors(err);
          if (!Object.keys(err).length) s.run(() => trackRequest(dossier, birthDate));
        }}
        className="grid gap-6 md:grid-cols-[1fr_1fr_auto] md:items-start"
      >
        <TextField label="N° de dossier" required placeholder="OPH-2025-000123" value={dossier} onChange={(e) => setDossier(e.target.value)} error={errors.dossier} />
        <TextField label="Date de naissance du demandeur" type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} error={errors.birthDate} />
        <Button type="submit" variant="accent" size="lg" className="md:mt-7">Suivre</Button>
      </form>
      <p className="text-sm text-muted">Démonstration : utilisez le dossier <strong>OPH-2025-000123</strong> avec n&apos;importe quelle date.</p>
    </div>
  );
}

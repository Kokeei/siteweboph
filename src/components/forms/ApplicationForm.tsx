"use client";

import { CheckCircle2, Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckboxField, SelectField, TextField } from "@/components/ui/FormField";
import { Modal } from "@/components/ui/Modal";
import { aidLabels, type AidType } from "@/lib/eligibility";
import { checkFile, isEmail, isPfPhone, type Errors } from "@/lib/validation";
import { submitForm } from "@/services/api";
import { useSubmit } from "./useSubmit";

const islands = ["Tahiti", "Moorea", "Raiatea", "Tahaa", "Huahine", "Bora Bora", "Nuku Hiva", "Hiva Oa", "Tubuai", "Rurutu", "Rangiroa", "Autre"].map((i) => ({ value: i, label: i }));
const pieces = [
  { key: "identity", label: "Pièce d'identité du demandeur" },
  { key: "income", label: "Justificatifs de revenus du foyer" },
  { key: "household", label: "Livret de famille ou attestation de composition du foyer" },
] as const;

type F = {
  aid: string; lastName: string; firstName: string; birthDate: string; email: string; phone: string;
  island: string; commune: string; householdSize: string; files: Record<string, File | null>; consent: boolean;
};

export function ApplicationForm() {
  const params = useSearchParams();
  const initialAid = params.get("aide") ?? "";
  const [f, setF] = useState<F>({
    aid: initialAid in aidLabels ? initialAid : "", lastName: "", firstName: "", birthDate: "", email: "", phone: "",
    island: "", commune: "", householdSize: "", files: {}, consent: false,
  });
  const [errors, setErrors] = useState<Errors<F> & Record<string, string | undefined>>({});
  const s = useSubmit<{ reference: string }>();
  const up = <K extends keyof F>(k: K, v: F[K]) => setF((x) => ({ ...x, [k]: v }));

  function validate() {
    const e: Record<string, string | undefined> = {};
    if (!f.aid) e.aid = "Choisissez le type d'aide.";
    if (!f.lastName.trim()) e.lastName = "Le nom est obligatoire.";
    if (!f.firstName.trim()) e.firstName = "Le prénom est obligatoire.";
    if (!f.birthDate) e.birthDate = "La date de naissance est obligatoire.";
    if (!isEmail(f.email)) e.email = "Adresse e-mail invalide.";
    if (!isPfPhone(f.phone)) e.phone = "Numéro invalide (8 chiffres).";
    if (!f.island) e.island = "Choisissez votre île.";
    if (!f.commune.trim()) e.commune = "La commune est obligatoire.";
    if (!(Number(f.householdSize) >= 1)) e.householdSize = "Indiquez au moins 1 personne.";
    for (const p of pieces) {
      const file = f.files[p.key];
      e[`file_${p.key}`] = file ? checkFile(file) : "Cette pièce est obligatoire.";
    }
    if (!f.consent) e.consent = "Vous devez certifier l'exactitude des informations.";
    Object.keys(e).forEach((k) => e[k] === undefined && delete e[k]);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return false;
    }
    return true;
  }

  const section = "rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-8";
  const legend = "mb-5 flex items-center gap-3 font-heading text-lg font-bold text-primary";
  const num = "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white";

  return (
    <>
      <form
        noValidate
        aria-busy={s.status === "loading"}
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) s.run(() => submitForm("dossier", { ...f, files: Object.keys(f.files) }));
        }}
        className="space-y-6"
      >
        {s.status === "error" && (
          <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm font-medium text-danger">
            {s.error}
          </p>
        )}
        <fieldset className={section}>
          <legend className="sr-only">Aide demandée</legend>
          <p className={legend} aria-hidden="true"><span className={num}>1</span>Aide demandée</p>
          <SelectField label="Type d'aide" required placeholder="Sélectionnez" options={Object.entries(aidLabels).map(([value, label]) => ({ value, label }))} value={f.aid} onChange={(e) => up("aid", e.target.value as AidType)} error={errors.aid} />
        </fieldset>
        <fieldset className={section}>
          <legend className="sr-only">Le demandeur</legend>
          <p className={legend} aria-hidden="true"><span className={num}>2</span>Le demandeur</p>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Nom" autoComplete="family-name" required value={f.lastName} onChange={(e) => up("lastName", e.target.value)} error={errors.lastName} />
            <TextField label="Prénom" autoComplete="given-name" required value={f.firstName} onChange={(e) => up("firstName", e.target.value)} error={errors.firstName} />
            <TextField label="Date de naissance" type="date" autoComplete="bday" required value={f.birthDate} onChange={(e) => up("birthDate", e.target.value)} error={errors.birthDate} />
            <TextField label="Nombre de personnes au foyer" type="number" min={1} inputMode="numeric" required value={f.householdSize} onChange={(e) => up("householdSize", e.target.value)} error={errors.householdSize} />
            <TextField label="E-mail" type="email" autoComplete="email" required value={f.email} onChange={(e) => up("email", e.target.value)} error={errors.email} />
            <TextField label="Téléphone" type="tel" autoComplete="tel" required value={f.phone} onChange={(e) => up("phone", e.target.value)} error={errors.phone} />
            <SelectField label="Île de résidence" required placeholder="Sélectionnez" options={islands} value={f.island} onChange={(e) => up("island", e.target.value)} error={errors.island} />
            <TextField label="Commune" autoComplete="address-level2" required value={f.commune} onChange={(e) => up("commune", e.target.value)} error={errors.commune} />
          </div>
        </fieldset>
        <fieldset className={section}>
          <legend className="sr-only">Pièces justificatives</legend>
          <p className={legend} aria-hidden="true"><span className={num}>3</span>Pièces justificatives</p>
          <p className="mb-5 text-sm text-muted">Documents numérisés au format PDF ou JPG, 2 Mo maximum par document.</p>
          <ul className="space-y-4">
            {pieces.map((p) => {
              const err = errors[`file_${p.key}`];
              const file = f.files[p.key];
              return (
                <li key={p.key}>
                  <label className={`flex cursor-pointer flex-col gap-3 rounded-lg border-2 border-dashed p-4 transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent sm:flex-row sm:items-center ${err ? "border-danger bg-danger/5" : file ? "border-secondary bg-secondary-light" : "border-line hover:border-primary"}`}>
                    <Upload className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="block font-semibold text-ink">{p.label} <span className="text-danger" aria-hidden="true">*</span></span>
                      <span className="block text-sm text-muted">{file ? file.name : "Cliquez pour sélectionner un fichier"}</span>
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,application/pdf,image/jpeg"
                      className="sr-only"
                      aria-invalid={!!err}
                      data-testid={`file-${p.key}`}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        up("files", { ...f.files, [p.key]: file });
                        setErrors((x) => ({ ...x, [`file_${p.key}`]: checkFile(file) }));
                      }}
                    />
                  </label>
                  {err && <p role="alert" className="mt-1 text-xs font-medium text-danger">{err}</p>}
                </li>
              );
            })}
          </ul>
        </fieldset>
        <CheckboxField label="Je certifie l'exactitude des informations fournies." checked={f.consent} onChange={(e) => up("consent", e.target.checked)} error={errors.consent} />
        <Button type="submit" variant="accent" size="lg" disabled={s.status === "loading"}>
          {s.status === "loading" ? "Envoi en cours…" : "Soumettre mon dossier"}
        </Button>
      </form>
      <Modal open={s.status === "success"} onClose={s.reset} title="Dossier transmis">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
          <p className="mt-3 text-ink">Votre dossier a bien été transmis (démonstration).</p>
          <p className="mt-2 text-sm text-muted">Référence provisoire : <strong className="text-ink">{s.data?.reference}</strong>. Un agent de l&apos;OPH vérifiera votre dossier et vous communiquera votre numéro de dossier.</p>
          <ButtonLink href="/suivi" variant="primary" className="mt-6">Suivre ma demande</ButtonLink>
        </div>
      </Modal>
    </>
  );
}

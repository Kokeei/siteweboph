"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckboxField, SelectField, TextAreaField, TextField } from "@/components/ui/FormField";
import { isEmail, isPfPhone, type Errors } from "@/lib/validation";
import { submitForm } from "@/services/api";
import { useSubmit } from "./useSubmit";

type F = { lastName: string; firstName: string; email: string; phone: string; subject: string; dossier: string; message: string; consent: boolean };
const empty: F = { lastName: "", firstName: "", email: "", phone: "", subject: "", dossier: "", message: "", consent: false };

export const contactSubjects = [
  { value: "demande", label: "Demande d'aide au logement" },
  { value: "suivi", label: "Suivi de mon dossier" },
  { value: "locataire", label: "Je suis locataire" },
  { value: "etudiant", label: "Hébergement étudiant" },
  { value: "fare-tropical", label: "Fare Tropical" },
  { value: "autre", label: "Autre demande" },
];

export function ContactForm() {
  const [f, setF] = useState<F>(empty);
  const [errors, setErrors] = useState<Errors<F>>({});
  const s = useSubmit<{ reference: string }>();
  const up = <K extends keyof F>(k: K, v: F[K]) => setF((x) => ({ ...x, [k]: v }));

  function validate() {
    const e: Errors<F> = {};
    if (!f.lastName.trim()) e.lastName = "Le nom est obligatoire.";
    if (!f.firstName.trim()) e.firstName = "Le prénom est obligatoire.";
    if (!isEmail(f.email)) e.email = "Adresse e-mail invalide.";
    if (f.phone && !isPfPhone(f.phone)) e.phone = "Numéro invalide (8 chiffres).";
    if (!f.subject) e.subject = "Choisissez un objet.";
    if (f.message.trim().length < 10) e.message = "Votre message doit comporter au moins 10 caractères.";
    if (!f.consent) e.consent = "Votre accord est nécessaire pour traiter votre demande.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  if (s.status === "success")
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-success/30 bg-success/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h2 className="mt-3 text-xl font-bold text-primary">Message envoyé</h2>
        <p className="mt-2 text-muted">Merci, votre message a bien été transmis. Référence : <strong className="text-ink">{s.data?.reference}</strong></p>
        <Button variant="outline" className="mt-6" onClick={() => { setF(empty); s.reset(); }}>
          Envoyer un autre message
        </Button>
      </div>
    );

  return (
    <form
      noValidate
      aria-busy={s.status === "loading"}
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) s.run(() => submitForm("contact", f));
      }}
      className="space-y-6"
    >
      {s.status === "error" && (
        <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm font-medium text-danger">
          {s.error}
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <TextField label="Nom" name="lastName" autoComplete="family-name" required value={f.lastName} onChange={(e) => up("lastName", e.target.value)} error={errors.lastName} />
        <TextField label="Prénom" name="firstName" autoComplete="given-name" required value={f.firstName} onChange={(e) => up("firstName", e.target.value)} error={errors.firstName} />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" required value={f.email} onChange={(e) => up("email", e.target.value)} error={errors.email} />
        <TextField label="Téléphone" name="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => up("phone", e.target.value)} error={errors.phone} hint="Facultatif" />
        <SelectField label="Objet" name="subject" required placeholder="Sélectionnez un objet" options={contactSubjects} value={f.subject} onChange={(e) => up("subject", e.target.value)} error={errors.subject} />
        <TextField label="N° de dossier" name="dossier" value={f.dossier} onChange={(e) => up("dossier", e.target.value)} hint="Si vous en avez un" />
      </div>
      <TextAreaField label="Message" name="message" required value={f.message} onChange={(e) => up("message", e.target.value)} error={errors.message} />
      <CheckboxField
        label="J'accepte que mes données soient utilisées pour traiter ma demande."
        checked={f.consent}
        onChange={(e) => up("consent", e.target.checked)}
        error={errors.consent}
      />
      <Button type="submit" variant="accent" size="lg" disabled={s.status === "loading"}>
        {s.status === "loading" ? "Envoi en cours…" : "Envoyer mon message"}
      </Button>
    </form>
  );
}

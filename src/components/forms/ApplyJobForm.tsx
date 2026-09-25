"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/FormField";
import { checkFile, isEmail, type Errors } from "@/lib/validation";
import { submitForm } from "@/services/api";
import { useSubmit } from "./useSubmit";

type F = { name: string; email: string; kind: string; message: string; cv: File | null };

export function ApplyJobForm() {
  const [f, setF] = useState<F>({ name: "", email: "", kind: "", message: "", cv: null });
  const [errors, setErrors] = useState<Errors<F>>({});
  const s = useSubmit<{ reference: string }>();

  if (s.status === "success")
    return (
      <div role="status" className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <p className="mt-3 font-bold text-primary">Candidature envoyée (démonstration). Référence : {s.data?.reference}</p>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const err: Errors<F> = {};
        if (!f.name.trim()) err.name = "Le nom est obligatoire.";
        if (!isEmail(f.email)) err.email = "Adresse e-mail invalide.";
        if (!f.kind) err.kind = "Choisissez un type de candidature.";
        err.cv = f.cv ? checkFile(f.cv) : "Votre CV est obligatoire.";
        if (!err.cv) delete err.cv;
        setErrors(err);
        if (!Object.keys(err).length) s.run(() => submitForm("postuler", { ...f, cv: f.cv?.name }));
      }}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <TextField label="Nom et prénom" required autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} error={errors.name} />
        <TextField label="E-mail" type="email" required autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={errors.email} />
      </div>
      <SelectField label="Type de candidature" required placeholder="Sélectionnez" options={[{ value: "spontanee", label: "Candidature spontanée" }, { value: "stage", label: "Stage" }, { value: "alternance", label: "Alternance" }]} value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })} error={errors.kind} />
      <TextField label="CV (PDF ou JPG, 2 Mo max.)" type="file" accept=".pdf,.jpg,.jpeg" required onChange={(e) => setF({ ...f, cv: e.target.files?.[0] ?? null })} error={errors.cv} className="file:mr-4 file:rounded-full file:border-0 file:bg-primary-light file:px-4 file:py-2 file:font-semibold file:text-primary" />
      <TextAreaField label="Lettre de motivation" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      <Button type="submit" variant="accent" size="lg" disabled={s.status === "loading"}>{s.status === "loading" ? "Envoi…" : "Envoyer ma candidature"}</Button>
    </form>
  );
}

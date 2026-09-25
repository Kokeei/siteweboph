"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RadioCards, TextField } from "@/components/ui/FormField";
import { login, type RequestStatus } from "@/services/api";
import { saveSession } from "@/services/session";
import { useSubmit } from "./useSubmit";

const profiles = [
  { value: "demandeur", label: "Demandeur", description: "J'ai déposé une demande d'aide." },
  { value: "locataire", label: "Locataire", description: "Je loue un logement OPH." },
  { value: "etudiant", label: "Étudiant", description: "Je suis hébergé dans un CHE." },
];

/** Connexion : choix du profil puis n° de dossier + mot de passe (parcours décrit sur www.oph.pf). */
export function LoginForm() {
  const router = useRouter();
  const [profile, setProfile] = useState("demandeur");
  const [dossier, setDossier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ dossier?: string; password?: string }>({});
  const s = useSubmit<RequestStatus>();

  return (
    <form
      noValidate
      aria-busy={s.status === "loading"}
      onSubmit={async (e) => {
        e.preventDefault();
        const err: typeof errors = {};
        if (!dossier.trim()) err.dossier = "Le numéro de dossier est obligatoire.";
        if (!password) err.password = "Le mot de passe est obligatoire.";
        setErrors(err);
        if (Object.keys(err).length) return;
        const res = await s.run(() => login(profile, dossier, password));
        if (res?.ok) {
          saveSession({ profile, ...res.data });
          router.push("/espace");
        }
      }}
      className="space-y-6"
    >
      <RadioCards legend="Je suis" name="profile" value={profile} onChange={setProfile} options={profiles} />
      {s.status === "error" && (
        <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm font-medium text-danger">{s.error}</p>
      )}
      <TextField label="N° de dossier" autoComplete="username" required value={dossier} onChange={(e) => setDossier(e.target.value)} error={errors.dossier} />
      <div className="relative">
        <TextField label="Mot de passe" type={show ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} className="pr-12" />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-[34px] rounded-full p-2 text-muted hover:text-primary" aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={show}>
          {show ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={s.status === "loading"}>
        <LockKeyhole className="h-4 w-4" aria-hidden="true" />
        {s.status === "loading" ? "Connexion…" : "Se connecter"}
      </Button>
      <p className="rounded-lg bg-surface p-3 text-center text-xs text-muted">
        Démonstration : n° <strong>OPH-2025-000123</strong> / mot de passe <strong>demo1234</strong>. Aucune donnée n&apos;est transmise.
      </p>
    </form>
  );
}

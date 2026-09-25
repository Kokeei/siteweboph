"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { RadioCards, SelectField, TextField } from "@/components/ui/FormField";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { aidLabels, formatXPF, type AidType, type SimulationResult } from "@/lib/eligibility";
import { postSimulation } from "@/services/api";

type Form = { aid: AidType | ""; householdSize: string; monthlyIncome: string; ownsLand: string; ownsHome: string; isMainResidence: string; lastAahiYear: string };
const initial: Form = { aid: "", householdSize: "", monthlyIncome: "", ownsLand: "", ownsHome: "", isMainResidence: "", lastAahiYear: "" };
const yesNo = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
];

/** Simulateur d'éligibilité en 3 étapes : aide → foyer → situation, puis résultat. */
export function EligibilitySimulator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [result, setResult] = useState<SimulationResult | null>(null);

  const set = (k: keyof Form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const stepsLabels = ["Type d'aide", "Votre foyer", "Votre situation"];

  function validate(s: number) {
    const e: typeof errors = {};
    if (s === 0 && !form.aid) e.aid = "Veuillez choisir le type d'aide.";
    if (s === 1) {
      const n = Number(form.householdSize);
      if (!form.householdSize || !Number.isInteger(n) || n < 1 || n > 20) e.householdSize = "Indiquez un nombre de personnes entre 1 et 20.";
      const inc = Number(form.monthlyIncome);
      if (form.monthlyIncome === "" || Number.isNaN(inc) || inc < 0) e.monthlyIncome = "Indiquez les revenus mensuels nets du foyer (0 si aucun).";
    }
    if (s === 2) {
      if (form.aid === "fare-oph" && !form.ownsLand) e.ownsLand = "Veuillez répondre à cette question.";
      if (form.aid === "aahi") {
        if (!form.ownsHome) e.ownsHome = "Veuillez répondre à cette question.";
        if (!form.isMainResidence) e.isMainResidence = "Veuillez répondre à cette question.";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate(2)) return;
    setStatus("loading");
    const res = await postSimulation({
      aid: form.aid as AidType,
      householdSize: Number(form.householdSize),
      monthlyIncome: Number(form.monthlyIncome),
      ownsLand: form.ownsLand === "oui",
      ownsHome: form.ownsHome === "oui",
      isMainResidence: form.isMainResidence === "oui",
      lastAahiYear: form.lastAahiYear ? Number(form.lastAahiYear) : undefined,
    }).catch(() => ({ ok: false as const, error: "Le service de simulation est indisponible." }));
    if (!res.ok) return setStatus("error");
    setResult(res.data);
    setStatus("done");
  }

  const reset = () => {
    setForm(initial);
    setErrors({});
    setResult(null);
    setStatus("idle");
    setStep(0);
  };

  if (status === "loading") return <LoadingState label="Calcul de votre éligibilité…" />;
  if (status === "error")
    return <ErrorState message="Le service de simulation est momentanément indisponible. Veuillez réessayer." action={<Button onClick={() => setStatus("idle")}>Réessayer</Button>} />;

  if (status === "done" && result)
    return (
      <div aria-live="polite" className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] md:p-10">
        {result.eligible ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-success" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-extrabold text-primary">Vous semblez éligible</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              D&apos;après vos réponses, votre foyer peut prétendre à : <strong className="text-ink">{aidLabels[form.aid as AidType]}</strong>. Vous pouvez déposer votre dossier en ligne.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={`/dossier?aide=${form.aid}`} variant="accent" size="lg">
                Déposer mon dossier
              </ButtonLink>
              <Button variant="outline" size="lg" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Nouvelle simulation
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-danger" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-extrabold text-primary">Vous ne semblez pas éligible</h2>
            <ul className="mx-auto mt-4 max-w-lg space-y-2 text-left text-muted">
              {result.reasons.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden="true" className="text-danger">•</span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted">
              L&apos;éligibilité tient compte de la situation globale de votre famille : n&apos;hésitez pas à contacter nos agences.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/nous-contacter" variant="primary" size="lg">
                Contacter un conseiller
              </ButtonLink>
              <Button variant="outline" size="lg" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Nouvelle simulation
              </Button>
            </div>
          </div>
        )}
        <p className="mt-8 border-t border-line pt-4 text-center text-xs text-muted">
          Plafond indicatif pour votre foyer : {formatXPF(result.ceiling)} / mois. Résultat non contractuel, donné à titre indicatif (prototype).
        </p>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) {
          if (validate(step)) setStep(step + 1);
        } else submit();
      }}
      className="rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]"
    >
      <ol className="flex border-b border-line" aria-label="Étapes de la simulation">
        {stepsLabels.map((l, i) => (
          <li key={l} aria-current={i === step ? "step" : undefined} className={`flex flex-1 items-center justify-center gap-2 px-2 py-4 text-center text-xs font-semibold sm:text-sm ${i === step ? "border-b-[3px] border-accent text-primary" : i < step ? "text-secondary" : "text-muted"}`}>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${i <= step ? "bg-primary text-white" : "bg-surface text-muted"}`}>{i + 1}</span>
            <span className="hidden sm:inline">{l}</span>
          </li>
        ))}
      </ol>
      <div className="space-y-6 p-6 md:p-10">
        <h2 className="text-xl font-bold text-primary">
          Étape {step + 1} sur 3 : {stepsLabels[step]}
        </h2>
        {step === 0 && (
          <RadioCards
            legend="Quelle aide souhaitez-vous demander ?"
            name="aid"
            value={form.aid}
            onChange={set("aid")}
            error={errors.aid}
            options={[
              { value: "habitat-groupe", label: "Résidences", description: "Je n'ai pas de terrain : je souhaite un logement en habitat groupé." },
              { value: "fare-oph", label: "Fare OPH", description: "J'ai un terrain et souhaite y construire ma résidence principale." },
              { value: "aahi", label: "Aide en matériaux", description: "Je suis propriétaire et souhaite améliorer mon logement." },
            ]}
          />
        )}
        {step === 1 && (
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Nombre de personnes dans le foyer" type="number" inputMode="numeric" min={1} max={20} required value={form.householdSize} onChange={(e) => set("householdSize")(e.target.value)} error={errors.householdSize} />
            <TextField
              label="Revenus mensuels nets du foyer (XPF)"
              type="number"
              inputMode="numeric"
              min={0}
              step={1000}
              required
              value={form.monthlyIncome}
              onChange={(e) => set("monthlyIncome")(e.target.value)}
              error={errors.monthlyIncome}
              hint="Salaires, pensions et allocations de toutes les personnes du foyer."
            />
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-6 md:grid-cols-2">
            {form.aid !== "aahi" && (
              <SelectField label="Disposez-vous d'un terrain constructible ?" required={form.aid === "fare-oph"} placeholder="Sélectionnez" options={yesNo} value={form.ownsLand} onChange={(e) => set("ownsLand")(e.target.value)} error={errors.ownsLand} />
            )}
            {form.aid === "aahi" && (
              <>
                <SelectField label="Êtes-vous propriétaire du logement ?" required placeholder="Sélectionnez" options={yesNo} value={form.ownsHome} onChange={(e) => set("ownsHome")(e.target.value)} error={errors.ownsHome} />
                <SelectField label="Est-ce votre résidence principale ?" required placeholder="Sélectionnez" options={yesNo} value={form.isMainResidence} onChange={(e) => set("isMainResidence")(e.target.value)} error={errors.isMainResidence} />
                <TextField label="Année de votre dernière aide en matériaux" type="number" inputMode="numeric" min={1979} max={2100} value={form.lastAahiYear} onChange={(e) => set("lastAahiYear")(e.target.value)} hint="Laissez vide si vous n'en avez jamais bénéficié." />
              </>
            )}
          </div>
        )}
        <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
              ← Précédent
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit" variant="accent" size="lg">
            {step < 2 ? "Suivant →" : "Voir mon résultat"}
          </Button>
        </div>
      </div>
    </form>
  );
}

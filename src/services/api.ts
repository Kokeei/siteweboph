/**
 * Couche d'accès aux données (mock).
 * En production, ces fonctions appelleraient l'API OPH via NEXT_PUBLIC_API_BASE_URL.
 * Aucun secret ne doit être placé ici : l'authentification réelle se fait côté serveur.
 */
import { simulate, type SimulationInput, type SimulationResult } from "@/lib/eligibility";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const LATENCY = process.env.NODE_ENV === "test" ? 0 : 600;

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

export async function postSimulation(input: SimulationInput): Promise<ApiResult<SimulationResult>> {
  await delay(LATENCY);
  return { ok: true, data: simulate(input) };
}

export type RequestStatus = {
  dossier: string;
  applicant: string;
  aid: string;
  submittedAt: string;
  currentStep: 0 | 1 | 2 | 3;
  history: { date: string; label: string }[];
};

/** Dossiers de démonstration : numéro OPH-2025-000123 / mot de passe « demo1234 ». */
const DEMO_DOSSIERS: Record<string, RequestStatus> = {
  "OPH-2025-000123": {
    dossier: "OPH-2025-000123",
    applicant: "Famille Teriitahi (démo)",
    aid: "Fare OPH",
    submittedAt: "2025-02-14",
    currentStep: 2,
    history: [
      { date: "2025-02-10", label: "Simulation d'éligibilité réalisée" },
      { date: "2025-02-14", label: "Dossier déposé en ligne" },
      { date: "2025-03-03", label: "Dossier vérifié et validé par un agent" },
    ],
  },
};

export async function login(profile: string, dossier: string, password: string): Promise<ApiResult<RequestStatus>> {
  await delay(LATENCY);
  const found = DEMO_DOSSIERS[dossier.trim().toUpperCase()];
  if (!found || password !== "demo1234") return { ok: false, error: "Numéro de dossier ou mot de passe incorrect." };
  void profile;
  return { ok: true, data: found };
}

export async function trackRequest(dossier: string, birthDate: string): Promise<ApiResult<RequestStatus>> {
  await delay(LATENCY);
  const found = DEMO_DOSSIERS[dossier.trim().toUpperCase()];
  if (!found || !birthDate) return { ok: false, error: "Aucun dossier ne correspond à ces informations." };
  return { ok: true, data: found };
}

export async function submitForm(kind: "contact" | "dossier" | "postuler", payload: Record<string, unknown>): Promise<ApiResult<{ reference: string }>> {
  await delay(LATENCY);
  if (payload.simulateError) return { ok: false, error: "Le service est momentanément indisponible. Veuillez réessayer." };
  const reference = `${kind.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;
  return { ok: true, data: { reference } };
}

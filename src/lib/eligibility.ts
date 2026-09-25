/**
 * Logique de simulation d'éligibilité — PROTOTYPE.
 * Les plafonds réels de l'OPH ne sont pas publiés ici : les seuils ci-dessous sont
 * illustratifs et doivent être remplacés par les règles officielles (arrêtés du Pays).
 */

export type AidType = "habitat-groupe" | "fare-oph" | "aahi";

export type SimulationInput = {
  aid: AidType;
  householdSize: number;
  monthlyIncome: number; // XPF, revenus nets mensuels du foyer
  ownsLand: boolean;
  ownsHome: boolean;
  isMainResidence: boolean;
  lastAahiYear?: number;
  currentYear?: number;
};

export type SimulationResult = {
  eligible: boolean;
  ceiling: number;
  reasons: string[];
};

/** Salaire minimum de référence (valeur illustrative, en XPF). */
export const REFERENCE_SMIG = 180_000;

/** Nombre de SMIG autorisés selon l'aide et la composition du foyer (illustratif). */
function ceilingFor(aid: AidType, householdSize: number) {
  const base = aid === "habitat-groupe" ? 2.5 : 2;
  const bonus = Math.min(Math.max(householdSize - 1, 0), 6) * 0.25;
  return Math.round((base + bonus) * REFERENCE_SMIG);
}

export function simulate(input: SimulationInput): SimulationResult {
  const reasons: string[] = [];
  const ceiling = ceilingFor(input.aid, input.householdSize);
  const year = input.currentYear ?? new Date().getFullYear();

  if (input.householdSize < 1) reasons.push("La composition du foyer doit comporter au moins une personne.");
  if (input.monthlyIncome > ceiling) reasons.push("Les revenus du foyer dépassent le plafond indicatif pour cette aide.");
  if (input.aid === "fare-oph" && !input.ownsLand) reasons.push("Le Fare OPH nécessite de disposer d'un terrain constructible.");
  if (input.aid === "aahi") {
    if (!input.ownsHome) reasons.push("L'AAHI est réservée aux propriétaires du logement à rénover.");
    if (!input.isMainResidence) reasons.push("Le logement doit constituer votre résidence principale.");
    if (input.lastAahiYear && year - input.lastAahiYear < 10)
      reasons.push("Une aide en matériaux ne peut être demandée qu'une fois tous les 10 ans.");
  }

  return { eligible: reasons.length === 0, ceiling, reasons };
}

export const aidLabels: Record<AidType, string> = {
  "habitat-groupe": "Logement en habitat groupé (Résidences)",
  "fare-oph": "Fare OPH sur mon terrain",
  aahi: "Aide en matériaux (AAHI)",
};

export function formatXPF(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ") + " XPF";
}

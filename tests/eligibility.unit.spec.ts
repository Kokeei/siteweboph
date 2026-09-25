import { expect, test } from "@playwright/test";
import { REFERENCE_SMIG, simulate } from "../src/lib/eligibility";
import { checkFile, isPfPhone } from "../src/lib/validation";
import { search } from "../src/lib/search";

const base = { householdSize: 3, monthlyIncome: 150_000, ownsLand: false, ownsHome: false, isMainResidence: false, currentYear: 2026 };

test("habitat groupé : revenus modestes éligibles", () => {
  expect(simulate({ ...base, aid: "habitat-groupe" }).eligible).toBe(true);
});

test("revenus au-dessus du plafond refusés", () => {
  const r = simulate({ ...base, aid: "habitat-groupe", monthlyIncome: REFERENCE_SMIG * 10 });
  expect(r.eligible).toBe(false);
  expect(r.reasons.join()).toContain("plafond");
});

test("Fare OPH exige un terrain", () => {
  expect(simulate({ ...base, aid: "fare-oph" }).eligible).toBe(false);
  expect(simulate({ ...base, aid: "fare-oph", ownsLand: true }).eligible).toBe(true);
});

test("AAHI : propriétaire, résidence principale, une fois tous les 10 ans", () => {
  const ok = { ...base, aid: "aahi" as const, ownsHome: true, isMainResidence: true };
  expect(simulate(ok).eligible).toBe(true);
  expect(simulate({ ...ok, lastAahiYear: 2020 }).eligible).toBe(false);
  expect(simulate({ ...ok, lastAahiYear: 2015 }).eligible).toBe(true);
  expect(simulate({ ...ok, ownsHome: false }).eligible).toBe(false);
});

test("validation téléphone et fichiers", () => {
  expect(isPfPhone("87 12 34 56")).toBe(true);
  expect(isPfPhone("+689 40463636")).toBe(true);
  expect(isPfPhone("1234")).toBe(false);
  const big = { name: "a.pdf", type: "application/pdf", size: 3 * 1024 * 1024 } as File;
  const png = { name: "a.png", type: "image/png", size: 100 } as File;
  const ok = { name: "a.jpg", type: "image/jpeg", size: 100 } as File;
  expect(checkFile(big)).toContain("2 Mo");
  expect(checkFile(png)).toContain("PDF ou JPG");
  expect(checkFile(ok)).toBeUndefined();
});

test("recherche insensible aux accents", () => {
  expect(search("hebergement").some((h) => h.href === "/p/hebergements-etudiants")).toBe(true);
  expect(search("")).toEqual([]);
});

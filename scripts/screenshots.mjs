/**
 * Captures d'écran pour la comparaison visuelle.
 * Usage : node scripts/screenshots.mjs <baseUrl> <dossierSortie> [--full] [--widths=1920,1440,1024,768,390] chemin1 chemin2 …
 * Exemple : node scripts/screenshots.mjs https://www.oph.pf shots/original / /p/fare-oph
 *           node scripts/screenshots.mjs http://localhost:3000 shots/repro / /p/fare-oph
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const [base, out, ...paths] = args.filter((a) => !a.startsWith("--"));
const full = flags.includes("--full");
const widths = (flags.find((f) => f.startsWith("--widths="))?.split("=")[1] ?? "1920,1440,1024,768,390").split(",").map(Number);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const path of paths.length ? paths : ["/"]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    const name = (path.replace(/\W+/g, "_").replace(/^_|_$/g, "") || "home") + `-${width}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: full });
  }
  if (errors.length) console.log(width, "erreurs console :", errors);
  await page.close();
}
await browser.close();

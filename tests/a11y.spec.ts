import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const keyPages = ["/", "/p/fare-oph", "/articles", "/nos-agences", "/simulation", "/dossier", "/connexion", "/nous-contacter", "/recherche?q=fare"];

for (const route of keyPages) {
  test(`accessibilité WCAG A/AA : ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).exclude("iframe").analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}) : ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary).toEqual([]);
  });
}

import { expect, test } from "@playwright/test";
import { routes } from "./routes";

test("tous les liens internes répondent", async ({ page, request }) => {
  test.skip(test.info().project.name !== "desktop", "une seule exécution suffit");
  test.setTimeout(120_000);
  const found = new Set<string>();
  for (const r of routes) {
    await page.goto(r);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!));
    hrefs.filter((h) => h.startsWith("/") && !h.startsWith("//")).forEach((h) => found.add(h.split("#")[0]));
  }
  const failures: string[] = [];
  for (const href of found) {
    const res = await request.get(href);
    if (res.status() >= 400) failures.push(`${href} → ${res.status()}`);
  }
  expect(failures).toEqual([]);
});

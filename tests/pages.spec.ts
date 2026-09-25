import { expect, test } from "@playwright/test";
import { routes } from "./routes";

for (const route of routes) {
  test(`page ${route} : statut, H1 unique, pas d'erreur console ni d'image cassée`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const res = await page.goto(route, { waitUntil: "networkidle" });
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/OPH/);
    const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
    expect(broken).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, "pas de défilement horizontal").toBeLessThanOrEqual(0);
    const missingAlt = await page.$$eval("img:not([alt])", (i) => i.length);
    expect(missingAlt).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("page inconnue : 404", async ({ page }) => {
  const res = await page.goto("/cette-page-n-existe-pas");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page introuvable" })).toBeVisible();
});

test("ancienne URL /p/logements-etudiants redirigée", async ({ page }) => {
  await page.goto("/p/logements-etudiants");
  await expect(page).toHaveURL(/\/p\/hebergements-etudiants$/);
});

test("SEO : robots.txt, sitemap.xml et Open Graph", async ({ page, request }) => {
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/p/fare-oph");
  await page.goto("/p/fare-oph");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Fare OPH/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
});

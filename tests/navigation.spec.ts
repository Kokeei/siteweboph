import { expect, test } from "@playwright/test";

test.describe("desktop", () => {
  test.skip(({ isMobile }) => !!isMobile, "desktop uniquement");

  test("sous-menu au survol et au clavier", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Menu principal" });
    const trigger = nav.getByRole("button", { name: "Nos aides" });
    await trigger.hover();
    await expect(nav.getByRole("link", { name: /Fare OPH/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await page.mouse.move(0, 600);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await nav.getByRole("link", { name: /Aide en matériaux/ }).click();
    await expect(page).toHaveURL(/\/p\/aahi$/);
    await expect(nav.getByRole("button", { name: "Nos aides" })).toBeVisible();
  });

  test("lien d'évitement vers le contenu", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  });
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile uniquement");

  test("menu hamburger : ouverture, accordéon, navigation, Échap", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Menu principal" })).toBeHidden();
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await menu.getByRole("button", { name: "Demandes d'aide" }).click();
    await menu.getByRole("link", { name: "Suivi de demande" }).click();
    await expect(page).toHaveURL(/\/suivi$/);
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test("recherche depuis l'en-tête", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Rechercher sur le site" }).click();
  await page.getByPlaceholder(/Rechercher une aide/).first().fill("étudiant");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/recherche\?q=/);
  await expect(page.getByRole("link", { name: /Hébergements étudiants/ }).first()).toBeVisible();
});

test("bandeau d'alerte fermable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Fermer l'alerte" }).click();
  await expect(page.getByRole("region", { name: "Information importante" })).toBeHidden();
  await page.reload();
  await expect(page.getByRole("region", { name: "Information importante" })).toBeHidden();
});

import { expect, test } from "@playwright/test";

test("simulation : parcours éligible puis lien vers le dossier", async ({ page }) => {
  await page.goto("/simulation");
  await page.getByRole("button", { name: /Suivant/ }).click();
  await expect(page.getByText("Veuillez choisir le type d'aide.")).toBeVisible();
  await page.getByLabel("Fare OPH").check();
  await page.getByRole("button", { name: /Suivant/ }).click();
  await page.getByLabel("Nombre de personnes dans le foyer").fill("4");
  await page.getByLabel(/Revenus mensuels/).fill("200000");
  await page.getByRole("button", { name: /Suivant/ }).click();
  await page.getByLabel(/terrain constructible/).selectOption("oui");
  await page.getByRole("button", { name: "Voir mon résultat" }).click();
  await expect(page.getByRole("heading", { name: "Vous semblez éligible" })).toBeVisible();
  await page.getByRole("link", { name: "Déposer mon dossier" }).last().click();
  await expect(page).toHaveURL(/\/dossier\?aide=fare-oph/);
  await expect(page.getByLabel("Type d'aide")).toHaveValue("fare-oph");
});

test("simulation : parcours non éligible", async ({ page }) => {
  await page.goto("/simulation");
  await page.getByLabel("Aide en matériaux").check();
  await page.getByRole("button", { name: /Suivant/ }).click();
  await page.getByLabel("Nombre de personnes dans le foyer").fill("2");
  await page.getByLabel(/Revenus mensuels/).fill("100000");
  await page.getByRole("button", { name: /Suivant/ }).click();
  await page.getByLabel("Êtes-vous propriétaire du logement ?").selectOption("non");
  await page.getByLabel("Est-ce votre résidence principale ?").selectOption("oui");
  await page.getByRole("button", { name: "Voir mon résultat" }).click();
  await expect(page.getByRole("heading", { name: "Vous ne semblez pas éligible" })).toBeVisible();
  await expect(page.getByText(/réservée aux propriétaires/)).toBeVisible();
});

test("contact : erreurs de validation puis envoi", async ({ page }) => {
  await page.goto("/nous-contacter");
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByText("Le nom est obligatoire.")).toBeVisible();
  await expect(page.getByText("Adresse e-mail invalide.")).toBeVisible();
  await page.getByRole("textbox", { name: "Nom", exact: true }).fill("Teriitahi");
  await page.getByLabel("Prénom").fill("Hina");
  await page.getByLabel("E-mail").fill("hina@example.pf");
  await page.getByLabel("Objet").selectOption("suivi");
  await page.getByLabel("Message").fill("Bonjour, je souhaite connaître l'état de mon dossier.");
  await page.getByLabel(/J'accepte/).check();
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByRole("heading", { name: "Message envoyé" })).toBeVisible();
});

test("dossier : contrôle des pièces justificatives (format et taille)", async ({ page }) => {
  await page.goto("/dossier");
  await page.getByTestId("file-identity").setInputFiles({ name: "id.png", mimeType: "image/png", buffer: Buffer.from("x") });
  await expect(page.getByText("Format accepté : PDF ou JPG.")).toBeVisible();
  await page.getByTestId("file-identity").setInputFiles({ name: "id.pdf", mimeType: "application/pdf", buffer: Buffer.alloc(2 * 1024 * 1024 + 1) });
  await expect(page.getByText("Le fichier dépasse 2 Mo.")).toBeVisible();
});

test("dossier : soumission complète et modale de confirmation", async ({ page }) => {
  await page.goto("/dossier?aide=aahi");
  await page.getByRole("textbox", { name: "Nom", exact: true }).fill("Teriitahi");
  await page.getByLabel("Prénom").fill("Hina");
  await page.getByLabel("Date de naissance").fill("1990-05-12");
  await page.getByLabel("Nombre de personnes au foyer").fill("3");
  await page.getByLabel("E-mail").fill("hina@example.pf");
  await page.getByLabel("Téléphone").fill("87 12 34 56");
  await page.getByLabel("Île de résidence").selectOption("Tahiti");
  await page.getByLabel("Commune").fill("Pirae");
  for (const k of ["identity", "income", "household"])
    await page.getByTestId(`file-${k}`).setInputFiles({ name: `${k}.pdf`, mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4") });
  await page.getByLabel(/Je certifie/).check();
  await page.getByRole("button", { name: "Soumettre mon dossier" }).click();
  const dialog = page.getByRole("dialog", { name: "Dossier transmis" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Fermer" }).click();
  await expect(dialog).toBeHidden();
});

test("connexion : échec puis succès et espace utilisateur", async ({ page }) => {
  await page.goto("/espace");
  await expect(page.getByText("Vous n'êtes pas connecté")).toBeVisible();
  await page.goto("/connexion");
  await page.getByLabel("N° de dossier").fill("OPH-2025-000123");
  await page.getByLabel(/^Mot de passe/).fill("mauvais");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByText("Numéro de dossier ou mot de passe incorrect.")).toBeVisible();
  await page.getByLabel(/^Mot de passe/).fill("demo1234");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page).toHaveURL(/\/espace$/);
  await expect(page.getByText(/Ia ora na/)).toBeVisible();
  await expect(page.getByText("Étape en cours")).toBeVisible();
  await page.getByRole("button", { name: "Se déconnecter" }).click();
  await expect(page).toHaveURL(/\/connexion$/);
});

test("suivi de demande : dossier inconnu puis dossier de démonstration", async ({ page }) => {
  await page.goto("/suivi");
  await page.getByLabel("N° de dossier").fill("INCONNU");
  await page.getByLabel("Date de naissance du demandeur").fill("1990-01-01");
  await page.getByRole("button", { name: "Suivre" }).click();
  await expect(page.getByText("Dossier introuvable")).toBeVisible();
  await page.getByLabel("N° de dossier").fill("OPH-2025-000123");
  await page.getByRole("button", { name: "Suivre" }).click();
  await expect(page.getByText("Historique")).toBeVisible();
});

test("actualités : filtre par catégorie et pagination", async ({ page }) => {
  await page.goto("/articles");
  await expect(page.getByRole("navigation", { name: "Pagination" })).toBeVisible();
  await page.getByRole("navigation", { name: "Pagination" }).getByRole("link", { name: "2" }).click();
  await expect(page).toHaveURL(/page=2/);
  await page.getByRole("link", { name: "Alerte", exact: true }).click();
  await expect(page.getByRole("main").getByRole("heading", { level: 2 })).toHaveCount(2);
});

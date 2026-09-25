import { articles } from "../src/data/articles";
import { pages } from "../src/data/pages";

export const routes = [
  "/",
  "/articles",
  "/articles?page=2",
  "/nos-agences",
  "/simulation",
  "/dossier",
  "/suivi",
  "/connexion",
  "/espace",
  "/nous-contacter",
  "/postuler",
  "/recherche?q=fare",
  "/plan-du-site",
  "/acheteur/nos-fare-oph-pour-tout-le-monde",
  ...pages.filter((p) => p.slug !== "fare-tropical").map((p) => `/p/${p.slug}`),
  ...articles.map((a) => `/article/${a.slug}`),
];

# Reproduction du site de l'OPH (Office Polynésien de l'Habitat)

Prototype Next.js reproduisant l'architecture et les parcours de [www.oph.pf](https://www.oph.pf/).

> ⚠️ **Prototype non officiel.** Aucune donnée saisie n'est transmise : l'API est simulée
> (`src/services/api.ts`). L'indexation par les moteurs est désactivée par défaut (`src/app/robots.ts`).
> Voir [`docs/DESIGN_NOTES.md`](docs/DESIGN_NOTES.md) pour ce qui est vérifié et ce qui reste à valider visuellement.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react · Playwright + axe-core

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Variables d'environnement (facultatives, aucune n'est secrète) :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (sitemap, Open Graph) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` pour autoriser l'indexation |
| `SITE_PASSWORD` | active une protection par mot de passe (navigateur) sur tout le site |
| `SITE_USER` | identifiant associé (`oph` par défaut) |

## Scripts

| Commande | Rôle |
|---|---|
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm test` | recette Playwright (nécessite `npm run build` au préalable) |
| `npm run images` | régénère les illustrations de remplacement |
| `npm run screenshots -- <url> <dossier> [--full] [--widths=…] <chemins…>` | captures pour la comparaison visuelle |

## Architecture

```
src/
  app/            routes (App Router) : /, /p/[slug], /articles, /article/[slug], /nos-agences,
                  /simulation, /dossier, /suivi, /connexion, /espace, /nous-contacter, /postuler,
                  /recherche, /plan-du-site, /acheteur/nos-fare-oph-pour-tout-le-monde, sitemap, robots
  components/
    layout/       Header, Navigation, MobileMenu, SearchOverlay, TopBar, AlertBanner, Footer, Logo
    home/         Hero, QuickAccess, ApplicationSteps
    cards/        ServiceCard, NewsCard, HousingCard, AgencyCard, DocumentCard
    content/      PageHero, ContentPageView, ContentBlocks, CTA, ContactSection, FormPageLayout
    forms/        EligibilitySimulator, ApplicationForm, TrackingForm, LoginForm, AccountSpace, ContactForm, ApplyJobForm
    ui/           Button, FormField, Modal, Breadcrumb, Pagination, SearchBar, SectionTitle, States (Loading/Error/Empty)
  data/           contenus mockés (pages, articles, agences, résidences, documents, navigation, site)
  lib/            logique métier (éligibilité, validation, recherche, formats)
  services/       couche API simulée + session de démonstration
tests/            Playwright : pages, liens, navigation, formulaires, accessibilité, logique métier
```

## Comptes de démonstration

- Connexion : dossier `OPH-2025-000123`, mot de passe `demo1234`
- Suivi : dossier `OPH-2025-000123`, n'importe quelle date de naissance

## Recette

`npm test` exécute 118 vérifications sur desktop (1440 px) et mobile (390 px) : statut HTTP, H1 unique,
absence d'erreurs console, d'images cassées et de défilement horizontal, liens internes, menus
(survol, clavier, hamburger, Échap), formulaires (validation, succès, erreurs), SEO, et audit
d'accessibilité WCAG 2.1 AA (axe-core).

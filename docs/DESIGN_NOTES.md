# Notes de design et hypothèses

## Contexte important

Pendant le développement, l'environnement cloud **bloquait l'accès réseau à `www.oph.pf`**
(ainsi qu'à `faretropical.oph.pf` et `web.archive.org`). La page officielle n'a donc pas pu être
ouverte ni capturée. Ce qui suit distingue ce qui est **vérifié** de ce qui est une **hypothèse**.

## Vérifié (sources publiques : résultats de recherche indexant oph.pf, service-public.pf, presse)

| Élément | Source |
|---|---|
| URLs : `/articles`, `/article/{slug}`, `/p/{slug}` (residences, fare-oph, aahi, hebergements-etudiants, logements-etudiants, nos-engagements, e-services), `/simulation`, `/nos-agences`, `/nous-contacter`, `/connexion`, `/postuler`, `/acheteur/nos-fare-oph-pour-tout-le-monde`, `/uploads/*.pdf` | index de recherche |
| Titres de page « {Titre} \| OPH » | index de recherche |
| Parcours d'accueil en 4 étapes : Simulation → Dossier → Validation → Suivi | page d'accueil (extrait indexé) |
| Bouton « Voir plus d'actualités » | page d'accueil (extrait indexé) |
| Connexion : choix du profil, n° de dossier + mot de passe | /p/e-services |
| Pièces justificatives PDF ou JPG, 2 Mo max. | /p/e-services |
| Siège rue Afarerii, Tihoni, Pirae – BP 1705 98713 Papeete – Tél. 40 46 36 36 – Fax 40 41 25 05 – horaires | service-public.pf, polynesiepratique.com |
| Agences Pirae, Papeete, Taravao | idem |
| Chiffres CHE Outumaoro (197 logements / 392 places) et Paraita (63 studios / 74 places) | /p/hebergements-etudiants |
| Alerte usurpation TikTok ; arrêt temporaire e-services Fare OPH/AAHI 2024 | articles oph.pf |

## Hypothèses (à valider par comparaison visuelle)

Toutes les valeurs visuelles sont centralisées dans `src/app/globals.css` (bloc `:root`) et
`src/app/layout.tsx` (polices) : les corriger là suffit à mettre tout le site à jour.

| Élément | Choix actuel | Raison |
|---|---|---|
| Couleur principale | bleu institutionnel `#0b4f8a` | identité « océan » cohérente avec un office public polynésien |
| Couleur d'accent | orange `#b9530e` | orange « coucher de soleil » assombri pour un contraste AA (4,88:1 sur blanc) |
| Couleur secondaire | lagon `#0a7a80` | turquoise assombri pour un contraste AA |
| Polices | Montserrat (titres) / Open Sans (texte) | polices institutionnelles courantes ; à remplacer par celles du site |
| Rayons | cartes 12 px, boutons en pilule | |
| Logo | pictogramme de remplacement (`public/images/logo-oph.svg`) | le logo officiel n'a pas pu être récupéré — **à remplacer** |
| Photos | illustrations SVG générées (`scripts/generate-images.mjs`), ratios 16:9 et hero large | photos officielles inaccessibles — **à remplacer** en conservant les noms de fichiers |
| Sous-menus | regroupement L'OPH / Demandes d'aide / Nos aides | structure déduite des URLs connues |
| `/dossier`, `/suivi`, `/p/lotissements`, `/p/formulaires`, `/recherche` | URLs supposées | fonctionnalités demandées, URL réelle inconnue |
| Adresses des agences de Papeete et Taravao | « à confirmer » | non publiées dans les sources consultées |
| Plafonds d'éligibilité (`src/lib/eligibility.ts`) | illustratifs | règles officielles non publiées — **à remplacer** |

## Procédure de comparaison visuelle (dès que www.oph.pf est accessible)

1. Autoriser `www.oph.pf` dans la politique réseau de l'environnement.
2. `npm run build && npx next start -p 3000`
3. Captures des deux sites aux 5 largeurs :
   ```
   node scripts/screenshots.mjs https://www.oph.pf shots/original --full / /p/fare-oph /p/residences /articles /nos-agences /simulation /connexion
   node scripts/screenshots.mjs http://localhost:3000 shots/repro --full / /p/fare-oph /p/residences /articles /nos-agences /simulation /connexion
   ```
4. Relever les styles calculés de l'original (couleurs, polices, tailles, marges, rayons, ombres)
   et reporter les valeurs dans les tokens de `globals.css`.
5. Remplacer logo et images dans `public/images` (mêmes noms de fichiers).

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

/** Menu principal. Les URLs reprennent celles du site officiel lorsqu'elles sont connues. */
export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "L'OPH",
    href: "/p/nos-engagements",
    children: [
      { label: "Nos engagements", href: "/p/nos-engagements", description: "Nos missions et nos valeurs" },
      { label: "Nos agences", href: "/nos-agences", description: "Adresses et horaires" },
      { label: "Actualités & évènements", href: "/articles", description: "Toute l'actualité de l'Office" },
      { label: "Postuler", href: "/postuler", description: "Rejoindre nos équipes" },
    ],
  },
  {
    label: "Demandes d'aide",
    href: "/simulation",
    children: [
      { label: "Simulation d'éligibilité", href: "/simulation", description: "Vérifiez votre éligibilité en ligne" },
      { label: "Dossier de demande", href: "/dossier", description: "Déposez votre dossier en ligne" },
      { label: "Suivi de demande", href: "/suivi", description: "Suivez l'avancement de votre dossier" },
      { label: "Formulaires à télécharger", href: "/p/formulaires", description: "Dossiers papier au format PDF" },
    ],
  },
  {
    label: "Nos aides",
    href: "/p/residences",
    children: [
      { label: "Résidences", href: "/p/residences", description: "Logements en habitat groupé" },
      { label: "Fare OPH", href: "/p/fare-oph", description: "Maison individuelle sur votre terrain" },
      { label: "Aide en matériaux – AAHI", href: "/p/aahi", description: "Améliorer votre habitat" },
      { label: "Hébergements étudiants", href: "/p/hebergements-etudiants", description: "CHE Outumaoro et Paraita" },
      { label: "Lotissements", href: "/p/lotissements", description: "Terrains viabilisés" },
      { label: "Fare Tropical", href: "/acheteur/nos-fare-oph-pour-tout-le-monde", description: "Kits fare sans condition de ressources" },
    ],
  },
  { label: "e-Services", href: "/p/e-services" },
  { label: "Contact", href: "/nous-contacter" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Nos aides",
    links: [
      { label: "Résidences", href: "/p/residences" },
      { label: "Fare OPH", href: "/p/fare-oph" },
      { label: "Aide en matériaux – AAHI", href: "/p/aahi" },
      { label: "Hébergements étudiants", href: "/p/hebergements-etudiants" },
      { label: "Lotissements", href: "/p/lotissements" },
      { label: "Fare Tropical", href: "/acheteur/nos-fare-oph-pour-tout-le-monde" },
    ],
  },
  {
    title: "Vos démarches",
    links: [
      { label: "Simulation", href: "/simulation" },
      { label: "Dossier de demande", href: "/dossier" },
      { label: "Suivi de demande", href: "/suivi" },
      { label: "e-Services", href: "/p/e-services" },
      { label: "Mon espace", href: "/connexion" },
    ],
  },
  {
    title: "L'Office",
    links: [
      { label: "Nos engagements", href: "/p/nos-engagements" },
      { label: "Nos agences", href: "/nos-agences" },
      { label: "Actualités", href: "/articles" },
      { label: "Postuler", href: "/postuler" },
      { label: "Contact", href: "/nous-contacter" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Mentions légales", href: "/p/mentions-legales" },
  { label: "Plan du site", href: "/plan-du-site" },
  { label: "Recherche", href: "/recherche" },
];

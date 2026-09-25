/**
 * Pages de contenu servies par le gabarit /p/[slug] (même modèle d'URL que www.oph.pf).
 * Le contenu est rédigé à partir d'informations publiques (oph.pf, service-public.pf/dhv) ;
 * les passages non vérifiables sont volontairement génériques.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; title: string; text: string }
  | { type: "steps" }
  | { type: "documents"; category?: string }
  | { type: "residences" }
  | { type: "figures"; items: { value: string; label: string }[] }
  | { type: "cta"; title: string; text: string; href: string; label: string };

export type ContentPage = {
  slug: string;
  title: string;
  /** Titre court utilisé dans le fil d'Ariane et les cartes */
  shortTitle?: string;
  description: string;
  image: string;
  parent?: { label: string; href: string };
  blocks: ContentBlock[];
};

const simulationCta: ContentBlock = {
  type: "cta",
  title: "Êtes-vous éligible ?",
  text: "Faites une simulation en ligne en quelques minutes avant de déposer votre dossier.",
  href: "/simulation",
  label: "Faire ma simulation",
};

export const pages: ContentPage[] = [
  {
    slug: "residences",
    title: "Résidences",
    description:
      "Logements sociaux en habitat groupé proposés par l'OPH en location simple, location-accession ou accession directe à la propriété.",
    image: "/images/residence.svg",
    parent: { label: "Nos aides", href: "/p/residences" },
    blocks: [
      {
        type: "p",
        text: "Le logement social en habitat groupé est destiné aux familles qui ne disposent pas de terrain. L'OPH gère un parc de résidences réparties à Tahiti et dans les îles.",
      },
      { type: "h2", text: "Trois formules" },
      {
        type: "ul",
        items: [
          "S1 – Location simple : vous êtes locataire d'un logement de l'OPH.",
          "S2 – Location-accession : vos loyers vous permettent de devenir propriétaire.",
          "S3 – Accession directe à la propriété.",
        ],
      },
      { type: "h2", text: "Nos résidences" },
      { type: "residences" },
      simulationCta,
    ],
  },
  {
    slug: "fare-oph",
    title: "Fare OPH",
    description:
      "Le Fare OPH : une maison individuelle en bois de type F3, F4 ou F5 installée sur le terrain du demandeur.",
    image: "/images/fare.svg",
    parent: { label: "Nos aides", href: "/p/residences" },
    blocks: [
      {
        type: "p",
        text: "Le logement social en habitat dispersé est destiné aux ménages disposant d'un terrain et souhaitant y installer leur résidence principale. Il consiste en l'installation d'un logement individuel en bois (Fare OPH) de type F3, F4 ou F5 sur le terrain fourni par le demandeur.",
      },
      { type: "h2", text: "Conditions" },
      {
        type: "ul",
        items: [
          "Disposer d'un terrain constructible (propriété, indivision ou autorisation d'occuper).",
          "Y établir sa résidence principale.",
          "Respecter les conditions de ressources applicables au foyer.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Bon à savoir",
        text: "L'éligibilité ne dépend pas seulement des revenus du foyer mais de la situation socio-économique globale de la famille.",
      },
      { type: "h2", text: "Comment faire ma demande ?" },
      { type: "steps" },
      simulationCta,
    ],
  },
  {
    slug: "aahi",
    title: "Aide en matériaux – AAHI",
    shortTitle: "AAHI",
    description:
      "L'aide à l'amélioration de l'habitat individuel (AAHI) permet aux propriétaires de rénover leur résidence principale grâce à une aide en matériaux.",
    image: "/images/materiaux.svg",
    parent: { label: "Nos aides", href: "/p/residences" },
    blocks: [
      {
        type: "p",
        text: "L'aide à l'amélioration de l'habitat individuel (AAHI) prend la forme d'une dotation en matériaux permettant de rénover, agrandir ou mettre aux normes votre logement.",
      },
      { type: "h2", text: "Qui peut en bénéficier ?" },
      {
        type: "ul",
        items: [
          "Être propriétaire du logement dans lequel les travaux sont nécessaires.",
          "Justifier que ce logement constitue votre résidence principale.",
          "Respecter les conditions de ressources.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Une demande tous les 10 ans",
        text: "Sauf circonstances exceptionnelles, une demande d'aide en matériaux ne peut être formulée qu'une fois tous les 10 ans.",
      },
      { type: "h2", text: "Comment faire ma demande ?" },
      { type: "steps" },
      simulationCta,
    ],
  },
  {
    slug: "hebergements-etudiants",
    title: "Hébergements étudiants",
    description:
      "L'OPH propose aux étudiants post-bac des logements individuels ou en colocation au CHE Outumaoro (Punaauia) et au CHE Paraita (Papeete).",
    image: "/images/etudiants.svg",
    parent: { label: "Nos aides", href: "/p/residences" },
    blocks: [
      {
        type: "p",
        text: "L'OPH propose des logements individuels ou en colocation aux étudiants poursuivant des études post-baccalauréat.",
      },
      {
        type: "figures",
        items: [
          { value: "197", label: "logements au CHE Outumaoro (Punaauia)" },
          { value: "392", label: "places étudiantes à Outumaoro" },
          { value: "63", label: "studios au CHE Paraita (Papeete)" },
          { value: "74", label: "places étudiantes à Paraita" },
        ],
      },
      { type: "h2", text: "Constituer son dossier" },
      {
        type: "p",
        text: "Les demandes sont ouvertes chaque année avant la rentrée universitaire. Des permanences sont organisées à l'Université de la Polynésie française pour accompagner les étudiants.",
      },
      { type: "documents", category: "Étudiants" },
    ],
  },
  {
    slug: "lotissements",
    title: "Lotissements",
    description: "Les lotissements aménagés par l'OPH pour permettre aux familles d'accéder à la propriété.",
    image: "/images/lotissement.svg",
    parent: { label: "Nos aides", href: "/p/residences" },
    blocks: [
      {
        type: "p",
        text: "L'OPH aménage des lotissements afin de proposer des parcelles viabilisées aux familles souhaitant construire leur résidence principale.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Information",
        text: "Les programmes présentés ci-dessous sont donnés à titre d'exemple dans ce prototype.",
      },
      { type: "residences" },
      simulationCta,
    ],
  },
  {
    slug: "nos-engagements",
    title: "Nos engagements",
    description: "Les missions et engagements de l'Office Polynésien de l'Habitat, opérateur public du logement social depuis 1979.",
    image: "/images/hero.svg",
    parent: { label: "L'OPH", href: "/p/nos-engagements" },
    blocks: [
      {
        type: "p",
        text: "Créé le 1er février 1979, l'Office Polynésien de l'Habitat est l'opérateur public du logement social en Polynésie française. Bailleur social, il met également en œuvre les aides au logement du Pays.",
      },
      { type: "h2", text: "Nos missions" },
      {
        type: "ul",
        items: [
          "Loger les familles aux revenus modestes en habitat groupé.",
          "Construire des Fare OPH sur les terrains des familles.",
          "Accompagner l'amélioration de l'habitat individuel.",
          "Héberger les étudiants.",
          "Développer une offre commerciale avec Fare Tropical.",
        ],
      },
      { type: "h2", text: "Nos engagements envers vous" },
      {
        type: "ul",
        items: [
          "Un accueil de proximité dans nos agences.",
          "Des démarches simplifiées et accessibles en ligne.",
          "Un traitement équitable et transparent des demandes.",
          "Un suivi de votre dossier à chaque étape.",
        ],
      },
    ],
  },
  {
    slug: "e-services",
    title: "e-Services",
    description: "Vos démarches en ligne avec l'OPH : simulation, dépôt de dossier, suivi de demande et espace locataire.",
    image: "/images/eservices.svg",
    blocks: [
      {
        type: "p",
        text: "Accédez à votre espace depuis www.oph.pf : sélectionnez votre profil, puis saisissez votre numéro de dossier et votre mot de passe.",
      },
      { type: "h2", text: "Les démarches disponibles" },
      {
        type: "ul",
        items: [
          "Simuler votre éligibilité aux aides de l'OPH.",
          "Déposer votre dossier de demande et vos pièces justificatives (PDF ou JPG, 2 Mo maximum par document).",
          "Suivre l'avancement de votre demande.",
          "Consulter votre espace locataire.",
        ],
      },
      { type: "steps" },
      {
        type: "cta",
        title: "Accéder à mon espace",
        text: "Connectez-vous avec votre numéro de dossier et votre mot de passe.",
        href: "/connexion",
        label: "Me connecter",
      },
    ],
  },
  {
    slug: "formulaires",
    title: "Formulaires à télécharger",
    shortTitle: "Formulaires",
    description: "Téléchargez les formulaires papier de l'OPH : demande d'aide au logement, pièces justificatives, hébergement étudiant.",
    image: "/images/eservices.svg",
    parent: { label: "Demandes d'aide", href: "/simulation" },
    blocks: [
      {
        type: "p",
        text: "Vous pouvez déposer votre demande sous format papier en téléchargeant le formulaire ci-dessous, ou en ligne après création de votre compte demandeur.",
      },
      { type: "documents" },
    ],
  },
  {
    slug: "fare-tropical",
    title: "Le Kit Fare Tropical",
    shortTitle: "Fare Tropical",
    description:
      "Fare Tropical par OPH commercialise des fare en bois et en béton, du T1 au T5, vendus en kits de matériaux et sans condition de ressources.",
    image: "/images/fare-tropical.svg",
    parent: { label: "Nos aides", href: "/p/residences" },
    blocks: [
      {
        type: "p",
        text: "Depuis 2022, le département commercial de l'Office, Fare Tropical par OPH, dispose de sa propre identité visuelle. Il commercialise des fare en bois mais aussi en béton, du T1 au T5, vendus sous forme de kits de matériaux et sans condition de ressources.",
      },
      {
        type: "figures",
        items: [
          { value: "T1 → T5", label: "de la petite surface à la maison familiale" },
          { value: "Bois & béton", label: "deux gammes de construction" },
          { value: "0", label: "condition de ressources" },
        ],
      },
      {
        type: "cta",
        title: "Découvrir les kits Fare Tropical",
        text: "Retrouvez tous les modèles sur le site dédié de Fare Tropical.",
        href: "https://faretropical.oph.pf/nos-kits/",
        label: "Voir les kits",
      },
    ],
  },
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    description: "Mentions légales du site de l'Office Polynésien de l'Habitat.",
    image: "/images/hero.svg",
    blocks: [
      { type: "h2", text: "Éditeur" },
      {
        type: "p",
        text: "Office Polynésien de l'Habitat – Rue Afarerii, quartier Tihoni, Pirae – BP 1705, 98 713 Papeete, Tahiti.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Prototype",
        text: "Ce site est une reproduction de démonstration. Les données personnelles saisies ne sont ni transmises ni conservées.",
      },
    ],
  },
];

export function getPage(slug: string) {
  return pages.find((p) => p.slug === slug);
}

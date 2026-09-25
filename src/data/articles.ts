export type Article = {
  slug: string;
  title: string;
  date: string; // ISO
  category: "Actualité" | "Évènement" | "Alerte";
  excerpt: string;
  image: string;
  body: string[];
};

/**
 * Actualités de démonstration. Les titres s'inspirent d'articles publics de l'OPH ;
 * dates et contenus sont indicatifs.
 */
export const articles: Article[] = [
  {
    slug: "alerte-usurpation-identite-tiktok",
    title: "Alerte : usurpation d'identité sur TikTok",
    date: "2025-09-02",
    category: "Alerte",
    excerpt: "Des comptes TikTok sans lien avec l'OPH usurpent notre identité. Ne communiquez jamais vos informations personnelles.",
    image: "/images/alerte.svg",
    body: [
      "L'Office Polynésien de l'Habitat a été informé de l'existence de comptes TikTok utilisant son nom et son logo.",
      "Ces comptes ne sont pas liés à l'OPH. Nous vous invitons à ne jamais communiquer vos informations personnelles, votre numéro de dossier ou votre mot de passe.",
      "Les seuls canaux officiels de l'OPH sont le site www.oph.pf et les pages Facebook, Instagram et LinkedIn de l'Office.",
    ],
  },
  {
    slug: "permanence-oph-upf-logement-etudiant-2025-2026",
    title: "Permanence de l'OPH à l'UPF pour les demandes de logement étudiant 2025-2026",
    date: "2025-06-16",
    category: "Évènement",
    excerpt: "Les équipes de l'OPH accompagnent les étudiants dans leurs demandes d'hébergement à l'Université de la Polynésie française.",
    image: "/images/etudiants.svg",
    body: [
      "Pour la rentrée 2025-2026, l'OPH tient une permanence sur le campus de l'Université de la Polynésie française.",
      "Les agents accompagnent les étudiants dans la constitution de leur dossier de demande d'hébergement au CHE Outumaoro et au CHE Paraita.",
    ],
  },
  {
    slug: "ouverture-depot-dossiers-2025",
    title: "Ouverture du dépôt des dossiers de demande d'aide au logement",
    date: "2025-01-31",
    category: "Actualité",
    excerpt: "Depuis le 31 janvier 2025, vous pouvez déposer votre dossier en ligne après avoir réalisé votre simulation d'éligibilité.",
    image: "/images/eservices.svg",
    body: [
      "Depuis le 31 janvier 2025, le dépôt des dossiers de demande d'aide au logement est ouvert.",
      "Réalisez d'abord votre simulation d'éligibilité en ligne. Si vous êtes éligible, remplissez et soumettez votre dossier en ligne. Un agent de l'OPH vérifiera et validera votre dossier puis vous communiquera votre numéro de dossier.",
    ],
  },
  {
    slug: "un-guichet-unique-pour-simplifier-les-demarches",
    title: "Un guichet unique pour simplifier les démarches",
    date: "2024-11-20",
    category: "Actualité",
    excerpt: "L'OPH réorganise son accueil pour simplifier le parcours des demandeurs.",
    image: "/images/agence.svg",
    body: [
      "Afin de simplifier les démarches des familles, l'OPH met en place un guichet unique regroupant l'information et le dépôt des demandes.",
      "Le réseau d'agences de Pirae, Papeete et Taravao doit être complété par une agence à Punaauia.",
    ],
  },
  {
    slug: "arret-temporaire-des-services-en-ligne-de-de-fare-oph-et-aahi",
    title: "Arrêt temporaire des services en ligne de Fare OPH et AAHI !",
    date: "2024-06-07",
    category: "Alerte",
    excerpt: "Du 7 juin au 31 décembre 2024, les demandes en ligne de Fare OPH et d'aide en matériaux sont suspendues pour refonte du processus.",
    image: "/images/alerte.svg",
    body: [
      "En raison d'une refonte évolutive du processus, les services en ligne concernant les demandes de Fare OPH et d'aide en matériaux (AAHI) sont interrompus du 7 juin au 31 décembre 2024.",
      "Les dossiers papier restent téléchargeables depuis la rubrique Formulaires.",
    ],
  },
  {
    slug: "aide-en-materiaux-121-familles-et-remise-de-cles-8-fare-oph",
    title: "Aide en matériaux pour 121 familles et remise de clés pour 8 Fare OPH",
    date: "2024-03-14",
    category: "Évènement",
    excerpt: "121 familles de Tahiti et Moorea bénéficient d'une aide en matériaux pour rénover leur logement.",
    image: "/images/materiaux.svg",
    body: [
      "121 familles originaires de Tahiti et Moorea ont reçu une aide en matériaux qui leur permettra de rénover leur logement.",
      "La cérémonie a également été l'occasion de remettre les clés de 8 Fare OPH à leurs nouveaux occupants.",
    ],
  },
  {
    slug: "fare-tropical-par-oph-lance-son-propre-site-internet",
    title: "Fare Tropical par OPH lance son propre site internet !",
    date: "2023-10-05",
    category: "Actualité",
    excerpt: "Découvrez les nombreux produits Fare Tropical par OPH sur faretropical.oph.pf.",
    image: "/images/fare-tropical.svg",
    body: [
      "Depuis 2022, le département commercial de l'Office, Fare Tropical par OPH, dispose de sa propre identité visuelle.",
      "Il commercialise des fare en bois et en béton, sans condition de ressources, du T1 au T5, vendus en kits de matériaux. Retrouvez-les sur faretropical.oph.pf.",
    ],
  },
  {
    slug: "livraison-residence-demonstration",
    title: "Livraison d'une nouvelle résidence en habitat groupé",
    date: "2023-07-12",
    category: "Évènement",
    excerpt: "De nouvelles familles emménagent dans une résidence livrée par l'OPH (article de démonstration).",
    image: "/images/residence.svg",
    body: ["Article de démonstration illustrant la pagination et le gabarit d'article."],
  },
  {
    slug: "journee-portes-ouvertes-demonstration",
    title: "Journée d'information sur les aides au logement",
    date: "2023-04-03",
    category: "Évènement",
    excerpt: "Les agents de l'OPH présentent les dispositifs d'aide au logement (article de démonstration).",
    image: "/images/fare.svg",
    body: ["Article de démonstration illustrant la pagination et le gabarit d'article."],
  },
];

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

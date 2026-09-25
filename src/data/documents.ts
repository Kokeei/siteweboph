export type DocumentItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  size: string;
  category: "Demande" | "AAHI" | "Fare OPH" | "Étudiants" | "Locataires";
};

/**
 * Formulaires téléchargeables. Seul le premier lien est une URL publique réelle du site OPH ;
 * les autres sont des fichiers fictifs servis localement (public/docs).
 */
export const documents: DocumentItem[] = [
  {
    id: "demande-aide-logement",
    title: "Formulaire de demande d'aide au logement",
    description: "Dossier papier unique pour l'habitat groupé, le Fare OPH et l'aide en matériaux.",
    href: "https://www.oph.pf/uploads/f6701demandedaideaulogement-618b039525616.pdf",
    size: "PDF",
    category: "Demande",
  },
  {
    id: "liste-pieces",
    title: "Liste des pièces justificatives",
    description: "Documents à joindre à votre demande (PDF ou JPG, 2 Mo maximum par pièce).",
    href: "/docs/liste-pieces-justificatives.pdf",
    size: "PDF",
    category: "Demande",
  },
  {
    id: "attestation-hebergement",
    title: "Attestation d'hébergement",
    description: "À compléter par la personne qui vous héberge.",
    href: "/docs/attestation-hebergement.pdf",
    size: "PDF",
    category: "Demande",
  },
  {
    id: "demande-etudiant",
    title: "Demande d'hébergement étudiant",
    description: "Dossier de candidature pour les CHE Outumaoro et Paraita.",
    href: "/docs/demande-hebergement-etudiant.pdf",
    size: "PDF",
    category: "Étudiants",
  },
];

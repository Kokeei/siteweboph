export type Agency = {
  id: string;
  name: string;
  island: string;
  address: string;
  phone: string;
  hours: string[];
  isHeadOffice?: boolean;
  mapQuery: string;
  image: string;
};

/**
 * Agences. Pirae (siège), Papeete et Taravao sont citées publiquement ;
 * les adresses précises de Papeete et Taravao sont à confirmer sur www.oph.pf/nos-agences.
 */
export const agencies: Agency[] = [
  {
    id: "pirae",
    name: "Siège – Agence de Pirae",
    island: "Tahiti",
    address: "Rue Afarerii, quartier Tihoni, Pirae",
    phone: "40 46 36 36",
    hours: ["Lundi – jeudi : 7h30 – 15h30", "Vendredi : 7h30 – 14h30"],
    isHeadOffice: true,
    mapQuery: "Office Polynésien de l'Habitat Pirae",
    image: "/images/agence.svg",
  },
  {
    id: "papeete",
    name: "Agence de Papeete",
    island: "Tahiti",
    address: "Papeete (adresse à confirmer)",
    phone: "40 46 36 36",
    hours: ["Lundi – jeudi : 7h30 – 15h30", "Vendredi : 7h30 – 14h30"],
    mapQuery: "Papeete Tahiti",
    image: "/images/agence.svg",
  },
  {
    id: "taravao",
    name: "Agence de Taravao",
    island: "Tahiti – Presqu'île",
    address: "Taravao (adresse à confirmer)",
    phone: "40 46 36 36",
    hours: ["Lundi – jeudi : 7h30 – 15h30", "Vendredi : 7h30 – 14h30"],
    mapQuery: "Taravao Tahiti",
    image: "/images/agence.svg",
  },
];

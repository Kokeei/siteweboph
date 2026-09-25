export type Residence = {
  id: string;
  name: string;
  commune: string;
  island: string;
  type: "Location simple" | "Location-accession" | "Accession" | "Étudiants" | "Lotissement";
  units: number;
  image: string;
};

/** Résidences de démonstration (noms de communes réels, programmes fictifs sauf CHE). */
export const residences: Residence[] = [
  { id: "che-outumaoro", name: "CHE Outumaoro", commune: "Punaauia", island: "Tahiti", type: "Étudiants", units: 197, image: "/images/etudiants.svg" },
  { id: "che-paraita", name: "CHE Paraita", commune: "Papeete", island: "Tahiti", type: "Étudiants", units: 63, image: "/images/etudiants.svg" },
  { id: "demo-faaa", name: "Résidence Te Ora (démo)", commune: "Faa'a", island: "Tahiti", type: "Location simple", units: 48, image: "/images/residence.svg" },
  { id: "demo-mahina", name: "Résidence Hau (démo)", commune: "Mahina", island: "Tahiti", type: "Location-accession", units: 32, image: "/images/residence.svg" },
  { id: "demo-taiarapu", name: "Lotissement Vaiora (démo)", commune: "Taiarapu-Est", island: "Tahiti", type: "Lotissement", units: 24, image: "/images/lotissement.svg" },
  { id: "demo-uturoa", name: "Résidence Tiare (démo)", commune: "Uturoa", island: "Raiatea", type: "Location simple", units: 20, image: "/images/residence.svg" },
];

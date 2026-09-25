/** Les 4 étapes du parcours de demande telles qu'affichées sur la page d'accueil de www.oph.pf */
export const applicationSteps = [
  { id: "simulation", title: "Simulation", text: "Effectuez votre simulation d'éligibilité en ligne.", href: "/simulation" },
  { id: "dossier", title: "Dossier", text: "Si vous êtes éligible, remplissez et soumettez votre dossier en ligne.", href: "/dossier" },
  { id: "validation", title: "Validation", text: "Un agent vous contactera une fois votre dossier validé.", href: "/p/e-services" },
  { id: "suivi", title: "Suivi", text: "Avec vos identifiants, suivez l'avancement de votre demande.", href: "/suivi" },
] as const;

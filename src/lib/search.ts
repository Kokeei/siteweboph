import { articles } from "@/data/articles";
import { pages } from "@/data/pages";
import { agencies } from "@/data/agencies";

export type SearchHit = { title: string; href: string; excerpt: string; type: string };

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const pageHref = (slug: string) => (slug === "fare-tropical" ? "/acheteur/nos-fare-oph-pour-tout-le-monde" : `/p/${slug}`);

const index: SearchHit[] = [
  ...pages.map((p) => ({ title: p.title, href: pageHref(p.slug), excerpt: p.description, type: "Page" })),
  ...articles.map((a) => ({ title: a.title, href: `/article/${a.slug}`, excerpt: a.excerpt, type: "Actualité" })),
  ...agencies.map((a) => ({ title: a.name, href: "/nos-agences", excerpt: a.address, type: "Agence" })),
  { title: "Simulation d'éligibilité", href: "/simulation", excerpt: "Vérifiez votre éligibilité aux aides de l'OPH.", type: "Démarche" },
  { title: "Dossier de demande", href: "/dossier", excerpt: "Déposez votre dossier de demande d'aide au logement en ligne.", type: "Démarche" },
  { title: "Suivi de demande", href: "/suivi", excerpt: "Suivez l'avancement de votre demande.", type: "Démarche" },
  { title: "Contact", href: "/nous-contacter", excerpt: "Écrire à l'OPH.", type: "Page" },
];

export function search(query: string): SearchHit[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return index.filter((hit) => {
    const hay = normalize(`${hit.title} ${hit.excerpt}`);
    return terms.every((t) => hay.includes(t));
  });
}

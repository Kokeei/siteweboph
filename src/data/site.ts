/** Informations institutionnelles (sources publiques : service-public.pf, polynesiepratique.com). */
export const site = {
  name: "Office Polynésien de l'Habitat",
  shortName: "OPH",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "L'Office Polynésien de l'Habitat (OPH) accompagne les familles de Polynésie française dans leur projet de logement : habitat groupé, Fare OPH, aide en matériaux, hébergements étudiants.",
  address: {
    street: "Rue Afarerii, quartier Tihoni",
    city: "Pirae",
    postal: "BP 1705 – 98 713 Papeete, Tahiti",
  },
  phone: "40 46 36 36",
  phoneHref: "tel:+68940463636",
  fax: "40 41 25 05",
  hours: [
    { days: "Du lundi au jeudi", time: "7h30 – 15h30" },
    { days: "Le vendredi", time: "7h30 – 14h30" },
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/ophsocial/" },
    { label: "Instagram", href: "https://www.instagram.com/oph_polynesie/" },
    { label: "LinkedIn", href: "https://pf.linkedin.com/company/office-polynesien-de-l-habitat" },
  ],
  alert: {
    id: "alerte-usurpation-2025",
    text: "Attention : des comptes TikTok non liés à l'OPH usurpent notre identité. Ne communiquez jamais vos informations personnelles.",
    href: "/articles",
  },
} as const;

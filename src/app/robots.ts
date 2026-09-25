import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Prototype non officiel : l'indexation est désactivée par défaut pour ne pas
 * concurrencer www.oph.pf. Mettre NEXT_PUBLIC_ALLOW_INDEXING=true en production réelle.
 */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow ? { userAgent: "*", allow: "/", disallow: ["/espace", "/connexion", "/recherche"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

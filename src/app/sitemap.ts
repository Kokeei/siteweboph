import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { pages } from "@/data/pages";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/articles", "/nos-agences", "/simulation", "/dossier", "/suivi", "/nous-contacter", "/postuler", "/plan-du-site", "/acheteur/nos-fare-oph-pour-tout-le-monde"];
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 })),
    ...pages.filter((p) => p.slug !== "fare-tropical").map((p) => ({ url: `${site.url}/p/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${site.url}/article/${a.slug}`, lastModified: a.date, priority: 0.5 })),
  ];
}

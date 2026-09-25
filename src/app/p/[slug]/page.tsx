import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ContentPageView } from "@/components/content/ContentPageView";
import { getPage, pages } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };

/** Anciennes URL du site OPH redirigées vers leur équivalent. */
const aliases: Record<string, string> = {
  "logements-etudiants": "/p/hebergements-etudiants",
  "fare-tropical": "/acheteur/nos-fare-oph-pour-tout-le-monde",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [...pages.filter((p) => p.slug !== "fare-tropical").map((p) => ({ slug: p.slug })), ...Object.keys(aliases).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/p/${slug}` },
    openGraph: { title: page.title, description: page.description, images: [page.image] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (aliases[slug]) permanentRedirect(aliases[slug]);
  const page = getPage(slug);
  if (!page) notFound();
  return <ContentPageView page={page} path={`/p/${slug}`} />;
}

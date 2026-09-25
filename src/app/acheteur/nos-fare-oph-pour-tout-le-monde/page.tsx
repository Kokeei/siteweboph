import type { Metadata } from "next";
import { ContentPageView } from "@/components/content/ContentPageView";
import { getPage } from "@/data/pages";

const page = getPage("fare-tropical")!;
const path = "/acheteur/nos-fare-oph-pour-tout-le-monde";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: path },
  openGraph: { title: page.title, description: page.description, images: [page.image] },
};

export default function FareTropicalPage() {
  return <ContentPageView page={page} path={path} />;
}

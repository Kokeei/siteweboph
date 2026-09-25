import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { site } from "@/data/site";
import "./globals.css";

const title = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-title", display: "swap" });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | OPH`, template: "%s | OPH" },
  description: site.description,
  applicationName: "OPH",
  openGraph: {
    type: "website",
    locale: "fr_PF",
    siteName: "OPH – Office Polynésien de l'Habitat",
    title: site.name,
    description: site.description,
    images: [{ url: "/images/hero.svg", width: 1920, height: 800, alt: "Fare et lagon en Polynésie française" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0b4f8a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${title.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#contenu" className="sr-only z-[100] rounded bg-accent px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Aller au contenu
        </a>
        <AlertBanner {...site.alert} />
        <TopBar />
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import { Clock, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { footerNav, legalNav } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative mt-auto bg-primary-dark text-white/85">
      {/* Vague décorative (identité lagon) */}
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute -top-[59px] left-0 h-[60px] w-full text-primary-dark">
        <path fill="currentColor" d="M0 40 C 240 0 480 0 720 30 S 1200 60 1440 20 V60 H0Z" />
      </svg>
      <div className="container-oph grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">
            Opérateur public du logement social en Polynésie française depuis 1979.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {site.address.street}, {site.address.city}
                <br />
                {site.address.postal}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={site.phoneHref} className="hover:text-white hover:underline">
                Tél. {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>Fax {site.fax}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} : {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
        {footerNav.map((col) => (
          <div key={col.title}>
            <h2 className="mb-4 text-base font-bold text-white">{col.title}</h2>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-oph flex flex-col items-center justify-between gap-4 py-6 text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. <span className="text-white/60">Prototype de démonstration – site non officiel.</span>
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

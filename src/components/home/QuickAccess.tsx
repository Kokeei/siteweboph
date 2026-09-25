import { Calculator, FileText, Search, UserRound } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/simulation", label: "Simulation", text: "Testez votre éligibilité", Icon: Calculator },
  { href: "/dossier", label: "Dossier de demande", text: "Déposez votre dossier en ligne", Icon: FileText },
  { href: "/suivi", label: "Suivi de demande", text: "Où en est mon dossier ?", Icon: Search },
  { href: "/connexion", label: "Mon espace", text: "Demandeur ou locataire", Icon: UserRound },
];

/** Tuiles d'accès rapide qui chevauchent le bas du hero sur desktop. */
export function QuickAccess() {
  return (
    <section aria-label="Accès rapides" className="relative z-10 lg:-mt-32">
      <div className="container-oph">
        <ul className="grid grid-cols-2 gap-3 py-8 md:gap-5 lg:grid-cols-4 lg:py-0">
          {items.map(({ href, label, text, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col items-start gap-3 rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] md:p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-heading text-base font-bold text-primary md:text-lg">{label}</span>
                <span className="text-sm text-muted">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

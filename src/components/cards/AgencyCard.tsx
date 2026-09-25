import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { Agency } from "@/data/agencies";

export function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border-t-4 border-primary bg-white p-6 shadow-[var(--shadow-card)]">
      {agency.isHeadOffice && <span className="mb-3 self-start rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-dark">Siège</span>}
      <h3 className="text-lg font-bold text-primary">{agency.name}</h3>
      <p className="text-sm font-semibold text-secondary">{agency.island}</p>
      <ul className="mt-4 flex-1 space-y-3 text-sm text-ink">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {agency.address}
        </li>
        <li className="flex gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <a href={`tel:+689${agency.phone.replace(/\s/g, "")}`} className="hover:underline">
            {agency.phone}
          </a>
        </li>
        <li className="flex gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            {agency.hours.map((h) => (
              <span key={h} className="block">
                {h}
              </span>
            ))}
          </span>
        </li>
      </ul>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agency.mapQuery)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
      >
        <Navigation className="h-4 w-4" aria-hidden="true" />
        Itinéraire<span className="sr-only"> vers {agency.name} (nouvel onglet)</span>
      </a>
    </article>
  );
}

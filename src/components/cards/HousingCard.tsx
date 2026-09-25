import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import type { Residence } from "@/data/residences";

export function HousingCard({ residence }: { residence: Residence }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
      <div className="relative aspect-[16/9]">
        <Image src={residence.image} alt="" fill sizes="(min-width:1024px) 280px, 50vw" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary">{residence.type}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-bold text-ink">{residence.name}</h3>
        <p className="flex items-center gap-2 text-sm text-muted">
          <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
          {residence.commune}, {residence.island}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Building2 className="h-4 w-4 text-accent" aria-hidden="true" />
          {residence.units} logements
        </p>
      </div>
    </article>
  );
}

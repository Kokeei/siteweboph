import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="OPH – Office Polynésien de l'Habitat, retour à l'accueil">
      <Image src="/images/logo-oph.svg" alt="" width={52} height={52} priority className="h-11 w-11 md:h-[52px] md:w-[52px]" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-heading text-2xl font-extrabold tracking-tight ${light ? "text-white" : "text-primary"}`}>OPH</span>
          <span className={`mt-1 hidden text-[0.7rem] font-semibold uppercase tracking-wider sm:block ${light ? "text-white/80" : "text-muted"}`}>
            Office Polynésien de l&apos;Habitat
          </span>
        </span>
      )}
    </Link>
  );
}

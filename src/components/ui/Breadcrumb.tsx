import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];
  const color = light ? "text-white/85" : "text-muted";
  return (
    <nav aria-label="Fil d'Ariane" className={`text-sm ${color}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />}
              {c.href && !last ? (
                <Link href={c.href} className="inline-flex items-center gap-1 hover:underline">
                  {i === 0 && <Home aria-hidden="true" className="h-3.5 w-3.5" />}
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-semibold" : ""}>
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

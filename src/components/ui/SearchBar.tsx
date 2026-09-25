import { Search } from "lucide-react";

/** Barre de recherche (formulaire GET vers /recherche, fonctionne sans JavaScript). */
export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form role="search" action="/recherche" method="get" className="flex items-center gap-2 rounded-[var(--radius-btn)] border-2 border-line bg-white p-1.5 pl-5 focus-within:border-primary">
      <label htmlFor="search-q" className="sr-only">Rechercher sur le site</label>
      <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
      <input id="search-q" name="q" type="search" defaultValue={defaultValue} placeholder="Rechercher une aide, une démarche…" className="min-w-0 flex-1 bg-transparent py-2 outline-none" />
      <button type="submit" className="rounded-[var(--radius-btn)] bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Rechercher</button>
    </form>
  );
}

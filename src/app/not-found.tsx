import { ButtonLink } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";

export default function NotFound() {
  return (
    <div className="container-oph flex max-w-2xl flex-col items-center py-24 text-center">
      <p className="font-heading text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Page introuvable</h1>
      <p className="mt-2 text-muted">La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-8 w-full"><SearchBar /></div>
      <ButtonLink href="/" className="mt-8">Retour à l&apos;accueil</ButtonLink>
    </div>
  );
}

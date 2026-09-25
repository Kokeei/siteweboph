import Image from "next/image";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";

/** Bandeau de titre des pages internes : image atténuée + dégradé + fil d'Ariane. */
export function PageHero({ title, intro, image = "/images/hero.svg", crumbs }: { title: string; intro?: string; image?: string; crumbs: Crumb[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-primary/40" />
      <div className="container-oph py-12 md:py-16 lg:py-20">
        <Breadcrumb items={crumbs} light />
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">{intro}</p>}
      </div>
    </section>
  );
}

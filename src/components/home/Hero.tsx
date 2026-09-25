import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function Hero({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary/10" />
      <div className="container-oph flex min-h-[460px] flex-col justify-center py-16 md:min-h-[540px] lg:min-h-[600px] lg:pb-40">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-white/85">Office Polynésien de l&apos;Habitat</p>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[3.25rem]">{title}</h1>
          <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/simulation" variant="accent" size="lg">
              Faire ma simulation
            </ButtonLink>
            <ButtonLink href="/dossier" variant="white" size="lg">
              Déposer mon dossier
            </ButtonLink>
          </div>
        </div>
      </div>
      {/* Vague de transition vers la section suivante */}
      <svg aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-10 w-full text-white md:h-[70px]">
        <path fill="currentColor" d="M0 40 C 320 90 640 0 960 30 S 1320 60 1440 30 V70 H0Z" />
      </svg>
    </section>
  );
}

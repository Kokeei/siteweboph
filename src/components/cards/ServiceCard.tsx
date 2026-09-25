import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ServiceCard({ href, title, text, image, badge }: { href: string; title: string; text: string; image: string; badge?: string }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={image} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {badge && <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">{badge}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-primary">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.95rem] text-muted">{text}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

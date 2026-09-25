import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { formatDate } from "@/lib/format";

const tone: Record<Article["category"], string> = {
  Actualité: "bg-primary",
  Évènement: "bg-secondary",
  Alerte: "bg-accent",
};

export function NewsCard({ article, headingLevel = 3 }: { article: Article; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={article.image} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white ${tone[article.category]}`}>{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold text-muted">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <H className="mt-2 text-lg font-bold leading-snug text-ink group-hover:text-primary">
          <Link href={`/article/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
      </div>
    </article>
  );
}

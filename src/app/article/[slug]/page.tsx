import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/cards/NewsCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { articles, getArticle, sortedArticles } from "@/data/articles";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/article/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.date, images: [a.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const others = sortedArticles.filter((o) => o.slug !== a.slug).slice(0, 3);
  return (
    <>
      <div className="bg-surface">
        <div className="container-oph max-w-4xl py-10 md:py-14">
          <Breadcrumb items={[{ label: "Actualités", href: "/articles" }, { label: a.title }]} />
          <p className="mt-6 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{a.category}</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-primary md:text-[2.5rem]">{a.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Publié le <time dateTime={a.date}>{formatDate(a.date)}</time>
          </p>
        </div>
      </div>
      <article className="container-oph max-w-4xl py-10 md:py-14">
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
          <Image src={a.image} alt="" fill priority sizes="(min-width:1024px) 900px, 100vw" className="object-cover" />
        </div>
        <div className="prose-oph text-lg">
          <p className="font-semibold">{a.excerpt}</p>
          {a.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/articles" variant="outline">
            ← Toutes les actualités
          </ButtonLink>
        </div>
      </article>
      <section className="bg-surface py-14" aria-labelledby="autres">
        <div className="container-oph">
          <h2 id="autres" className="mb-8 text-2xl font-extrabold text-primary">
            À lire aussi
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <NewsCard article={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

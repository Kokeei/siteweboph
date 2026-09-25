import type { ReactNode } from "react";

/** Titre de section : sur-titre coloré + titre + trait décoratif, aligné au centre ou à gauche. */
export function SectionTitle({
  kicker,
  title,
  children,
  align = "center",
  as: Tag = "h2",
  light = false,
  id,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  light?: boolean;
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`mb-10 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {kicker && <p className={`mb-2 text-sm font-bold uppercase tracking-[0.14em] ${light ? "text-white/80" : "text-secondary"}`}>{kicker}</p>}
      <Tag id={id} className={`text-2xl font-extrabold leading-tight md:text-[2.1rem] ${light ? "text-white" : "text-primary"}`}>{title}</Tag>
      <span aria-hidden="true" className={`mt-4 block h-1 w-14 rounded-full bg-accent ${center ? "mx-auto" : ""}`} />
      {children && <div className={`mt-4 text-base md:text-lg ${light ? "text-white/85" : "text-muted"}`}>{children}</div>}
    </div>
  );
}

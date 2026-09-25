import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  accent: "bg-accent text-white hover:bg-accent-dark",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-primary-light",
  white: "bg-white text-primary hover:bg-primary-light",
};
const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({ variant, size, className = "", ...props }: Common & ComponentProps<"button">) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className = "",
  href,
  ...props
}: Common & { href: string } & Omit<ComponentProps<"a">, "href">) {
  if (/^(tel|mailto):/.test(href)) return <a href={href} className={buttonClasses(variant, size, className)} {...props} />;
  const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  if (external)
    return <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, size, className)} {...props} />;
  return <Link href={href} className={buttonClasses(variant, size, className)} {...props} />;
}

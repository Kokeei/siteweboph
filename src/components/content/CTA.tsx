import { ButtonLink } from "@/components/ui/Button";

export function CTA({ title, text, href, label, variant = "primary" }: { title: string; text: string; href: string; label: string; variant?: "primary" | "accent" }) {
  const bg = variant === "primary" ? "bg-primary" : "bg-accent";
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${bg} px-6 py-10 text-white md:px-12`}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-56 w-56 text-white/10">
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="18" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="18" />
      </svg>
      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-white">{text}</p>
        </div>
        <ButtonLink href={href} variant={variant === "primary" ? "accent" : "white"} size="lg" className="shrink-0">
          {label}
        </ButtonLink>
      </div>
    </div>
  );
}

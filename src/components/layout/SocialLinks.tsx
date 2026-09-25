import { site } from "@/data/site";

const icons: Record<string, React.ReactNode> = {
  Facebook: <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />,
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" />
    </>
  ),
  LinkedIn: <path d="M5 8.8h3v10.7H5V8.8Zm1.5-4.8a1.7 1.7 0 1 1 0 3.5 1.7 1.7 0 0 1 0-3.5ZM9.9 8.8h2.9v1.5c.4-.8 1.4-1.7 3-1.7 3.1 0 3.7 2 3.7 4.7v6.2h-3V14c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-2.9V8.8Z" />,
};

export function SocialLinks({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-10 w-10 bg-white/10 hover:bg-accent";
  return (
    <ul className="flex items-center gap-2">
      {site.social.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (nouvel onglet)`}
            className={`flex items-center justify-center rounded-full transition-colors hover:text-white ${box}`}
          >
            <svg viewBox="0 0 24 24" className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} fill="currentColor" aria-hidden="true">
              {icons[s.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

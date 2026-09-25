"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/data/navigation";

export function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || !!item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));
}

/** Menu principal desktop : sous-menus ouverts au survol, au clic et au clavier (Échap pour fermer). */
export function Navigation({ items, pathname }: { items: NavItem[]; pathname: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const linkBase = "relative flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[0.95rem] font-semibold transition-colors xl:px-4";
  const underline = "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-accent after:transition-transform xl:after:inset-x-4";

  return (
    <nav ref={ref} aria-label="Menu principal" className="hidden xl:block">
      <ul className="flex items-center">
        {items.map((item) => {
          const active = isActive(pathname, item);
          const cls = `${linkBase} ${underline} ${active ? "text-primary after:scale-x-100" : "text-ink hover:text-primary after:scale-x-0 hover:after:scale-x-100"}`;
          if (!item.children)
            return (
              <li key={item.label}>
                <Link href={item.href} className={cls} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          const isOpen = open === item.label;
          const id = `submenu-${item.label.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <li key={item.label} className="relative" onMouseEnter={() => setOpen(item.label)} onMouseLeave={() => setOpen(null)}>
              <button type="button" className={cls} aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : item.label)}>
                {item.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <div
                id={id}
                className={`absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3 transition-all duration-200 ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
              >
                <ul className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-2 shadow-[var(--shadow-card-hover)]">
                  {item.children.map((c) => {
                    const cActive = pathname === c.href;
                    return (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={cActive ? "page" : undefined}
                          className={`block rounded-lg px-4 py-2.5 transition-colors hover:bg-primary-light ${cActive ? "bg-primary-light" : ""}`}
                        >
                          <span className="block text-sm font-semibold text-primary">{c.label}</span>
                          {c.description && <span className="block text-xs text-muted">{c.description}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

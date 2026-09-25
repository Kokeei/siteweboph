"use client";

import { ChevronDown, Phone, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { isActive } from "./Navigation";

/** Menu mobile plein écran (tiroir depuis la droite) avec sous-menus en accordéon. */
export function MobileMenu({ open, onClose, items, pathname }: { open: boolean; onClose: () => void; items: NavItem[]; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-line px-4">
          <Logo compact />
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-light" aria-label="Fermer le menu">
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = isActive(pathname, item);
              if (!item.children)
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={`block py-4 text-base font-semibold ${active ? "text-primary" : "text-ink"}`}>
                      {item.label}
                    </Link>
                  </li>
                );
              const isOpen = expanded === item.label;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between py-4 text-left text-base font-semibold ${active ? "text-primary" : "text-ink"}`}
                  >
                    {item.label}
                    <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <div className={`grid transition-all ${isOpen ? "mb-3 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <ul className="min-h-0 overflow-hidden">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            tabIndex={isOpen ? 0 : -1}
                            className={`block rounded-lg px-4 py-2.5 text-[0.95rem] ${pathname === c.href ? "bg-primary-light font-semibold text-primary" : "text-muted hover:bg-surface"}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="space-y-3 border-t border-line p-4">
          <Link href="/connexion" className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 py-3 font-semibold text-white">
            <UserRound className="h-4 w-4" aria-hidden="true" />
            Mon espace
          </Link>
          <a href={site.phoneHref} className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] border-2 border-primary px-5 py-2.5 font-semibold text-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

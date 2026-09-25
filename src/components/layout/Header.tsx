"use client";

import { Menu, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme les panneaux à chaque navigation
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? "shadow-[0_4px_20px_-10px_rgba(11,79,138,0.35)]" : "border-b border-line"}`}>
      <div className="container-oph flex h-[72px] items-center justify-between gap-4 lg:h-[88px]">
        <Logo />
        <Navigation items={mainNav} pathname={pathname} />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-light"
            aria-label="Rechercher sur le site"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <Link
            href="/connexion"
            className="hidden items-center gap-2 rounded-[var(--radius-btn)] bg-accent px-5 py-2.5 whitespace-nowrap text-sm font-semibold text-white transition-colors hover:bg-accent-dark sm:inline-flex"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            Mon espace
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary-light xl:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} items={mainNav} pathname={pathname} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

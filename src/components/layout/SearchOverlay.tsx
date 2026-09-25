"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Recherche"
      className="mx-auto mt-24 w-[min(92vw,44rem)] rounded-[var(--radius-card)] bg-transparent p-0 backdrop:bg-primary-dark/80"
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (!q.trim()) return;
          onClose();
          router.push(`/recherche?q=${encodeURIComponent(q.trim())}`);
        }}
        className="flex items-center gap-2 rounded-[var(--radius-card)] bg-white p-2 shadow-2xl"
      >
        <label htmlFor="overlay-search" className="sr-only">
          Rechercher
        </label>
        <Search className="ml-3 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
        <input
          id="overlay-search"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une aide, une démarche, une actualité…"
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none"
        />
        <button type="submit" className="rounded-[var(--radius-btn)] bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          Rechercher
        </button>
        <button type="button" onClick={onClose} className="rounded-full p-2 text-muted hover:bg-surface" aria-label="Fermer la recherche">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </dialog>
  );
}

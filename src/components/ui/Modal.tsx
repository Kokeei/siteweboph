"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/** Fenêtre modale accessible basée sur <dialog> (piège du focus et Échap natifs). */
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

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
      aria-labelledby="modal-title"
      className="m-auto w-[min(92vw,34rem)] rounded-[var(--radius-card)] p-0 shadow-[var(--shadow-card-hover)] backdrop:bg-ink/60"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h2 id="modal-title" className="text-lg font-bold text-primary">
          {title}
        </h2>
        <button type="button" onClick={onClose} className="rounded-full p-1 text-muted hover:bg-surface" aria-label="Fermer">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}

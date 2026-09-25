"use client";

import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Bandeau d'alerte fermable ; la fermeture est mémorisée localement (confort, non critique). */
export function AlertBanner({ id, text, href }: { id: string; text: string; href: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(`oph-alert-${id}`) === "closed") setHidden(true);
    } catch {
      /* stockage indisponible : on affiche le bandeau */
    }
  }, [id]);

  if (hidden) return null;

  const close = () => {
    setHidden(true);
    try {
      localStorage.setItem(`oph-alert-${id}`, "closed");
    } catch {
      /* ignoré */
    }
  };

  return (
    <div className="bg-accent text-white" role="region" aria-label="Information importante">
      <div className="container-oph flex items-center gap-3 py-2.5 text-sm">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="flex-1">
          {text}{" "}
          <Link href={href} className="font-semibold underline underline-offset-2">
            En savoir plus
          </Link>
        </p>
        <button type="button" onClick={close} className="rounded-full p-1 hover:bg-white/20" aria-label="Fermer l'alerte">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

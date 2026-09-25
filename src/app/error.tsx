"use client";

import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/States";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-oph max-w-2xl py-24">
      <ErrorState message="Cette page n'a pas pu être affichée. Veuillez réessayer." action={<Button onClick={reset}>Réessayer</Button>} />
    </div>
  );
}

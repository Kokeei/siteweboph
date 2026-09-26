import { NextResponse, type NextRequest } from "next/server";

/**
 * Protection par mot de passe (authentification HTTP Basic) du prototype.
 * Active uniquement si la variable d'environnement SITE_PASSWORD est définie
 * (à configurer dans Vercel → Settings → Environment Variables). Sans elle, le site est ouvert
 * (développement local, tests). L'identifiant est SITE_USER, « oph » par défaut.
 */
export function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();
  const user = process.env.SITE_USER || "oph";

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const i = decoded.indexOf(":");
      if (i >= 0 && safeEqual(decoded.slice(0, i), user) && safeEqual(decoded.slice(i + 1), password)) return NextResponse.next();
    } catch {
      /* en-tête mal formé : on redemande les identifiants */
    }
  }

  return new NextResponse("Accès réservé. Veuillez saisir l'identifiant et le mot de passe.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Prototype OPH", charset="UTF-8"', "Content-Type": "text/plain; charset=utf-8" },
  });
}

/** Comparaison en temps constant pour ne pas révéler le mot de passe par mesure de durée. */
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export const config = { matcher: "/:path*" };

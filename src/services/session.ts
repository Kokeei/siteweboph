import type { RequestStatus } from "./api";

/**
 * Session de DÉMONSTRATION stockée dans sessionStorage.
 * Une vraie implémentation utiliserait un cookie httpOnly posé par le serveur.
 */
export type DemoSession = RequestStatus & { profile: string };
const KEY = "oph-demo-session";

export function saveSession(s: DemoSession) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* stockage indisponible */
  }
}

export function readSession(): DemoSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignoré */
  }
}

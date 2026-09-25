export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/** Numéros polynésiens : 8 chiffres (ex. 87 12 34 56 / 40 46 36 36), indicatif +689 facultatif. */
export const isPfPhone = (v: string) => /^(\+?689)?\d{8}$/.test(v.replace(/[\s.-]/g, ""));

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ACCEPTED_TYPES = ["application/pdf", "image/jpeg"];

/** Pièces justificatives : PDF ou JPG, 2 Mo maximum par document (règle affichée sur www.oph.pf). */
export function checkFile(file: File | undefined | null): string | undefined {
  if (!file) return undefined;
  if (!ACCEPTED_TYPES.includes(file.type) && !/\.(pdf|jpe?g)$/i.test(file.name)) return "Format accepté : PDF ou JPG.";
  if (file.size > MAX_FILE_SIZE) return "Le fichier dépasse 2 Mo.";
  return undefined;
}

export type Errors<T> = Partial<Record<keyof T, string>>;

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Pacific/Tahiti" }).format(
    new Date(iso + "T12:00:00-10:00"),
  );
}

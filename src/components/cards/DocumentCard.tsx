import { Download, FileText } from "lucide-react";
import type { DocumentItem } from "@/data/documents";

export function DocumentCard({ doc }: { doc: DocumentItem }) {
  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 transition hover:border-primary hover:shadow-[var(--shadow-card)]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
        <FileText className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-ink group-hover:text-primary">{doc.title}</span>
        <span className="block text-sm text-muted">{doc.description}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-primary">
        <Download className="h-4 w-4" aria-hidden="true" />
        {doc.size}
        <span className="sr-only">(nouvel onglet)</span>
      </span>
    </a>
  );
}

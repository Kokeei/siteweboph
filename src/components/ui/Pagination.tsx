import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, basePath }: { page: number; totalPages: number; basePath: string }) {
  if (totalPages <= 1) return null;
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  const item = "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition";
  return (
    <nav aria-label="Pagination" className="mt-12 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={href(page - 1)} className={`${item} text-primary hover:bg-primary-light`} aria-label="Page précédente">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className={`${item} text-line`} aria-hidden="true">
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link
              href={href(p)}
              aria-current={p === page ? "page" : undefined}
              className={`${item} ${p === page ? "bg-primary text-white" : "text-primary hover:bg-primary-light"}`}
            >
              {p}
            </Link>
          </li>
        ))}
        <li>
          {page < totalPages ? (
            <Link href={href(page + 1)} className={`${item} text-primary hover:bg-primary-light`} aria-label="Page suivante">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className={`${item} text-line`} aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

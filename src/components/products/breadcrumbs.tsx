import Link from "next/link";

type BreadcrumbsProps = {
  currentLabel: string;
};

export function Breadcrumbs({ currentLabel }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/products"
            className="transition-colors hover:text-[var(--foreground)]"
          >
            Products
          </Link>
        </li>
        <li aria-hidden="true" className="text-[var(--border-strong)]">
          /
        </li>
        <li className="font-medium text-[var(--foreground)]">{currentLabel}</li>
      </ol>
    </nav>
  );
}

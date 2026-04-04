import Link from "next/link";

import { getFallbackCategoryLabel } from "@/lib/api/products";

type EmptyStateProps = {
  search: string;
  category: string;
};

export function EmptyState({ search, category }: EmptyStateProps) {
  return (
    <section className="rounded-[1.75rem] border border-dashed border-[var(--border-strong)] bg-[var(--surface-raised)] px-6 py-12 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
        No matches found
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
        Try broadening your search
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
        We couldn&apos;t find any products for
        {search ? ` "${search}"` : " your current query"}
        {category ? ` in ${getFallbackCategoryLabel(category)}` : ""}. Clear
        one or both filters to see the full listing again.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[var(--border-strong)] px-5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
      >
        Reset filters
      </Link>
    </section>
  );
}

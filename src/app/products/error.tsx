"use client";

import Link from "next/link";
import { useEffect } from "react";

type ProductsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({
  error,
  reset,
}: ProductsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
          We couldn&apos;t load this product view
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          The request to the product service failed or returned an unexpected
          response. You can try again, or head back to the full listing and
          continue browsing.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--border-strong)] px-5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-raised)]"
          >
            Back to products
          </Link>
        </div>
      </section>
    </main>
  );
}

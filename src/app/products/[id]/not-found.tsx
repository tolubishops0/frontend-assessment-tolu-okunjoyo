import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
          Product not found
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
          We couldn&apos;t find that product
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
          The product may have been removed, the link may be incorrect, or the
          id in the URL is not valid. You can head back to the main catalog and
          continue browsing from there.
        </p>

        <div className="mt-8">
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

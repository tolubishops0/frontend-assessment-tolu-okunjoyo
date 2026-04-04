import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-raised)] shadow-[0_16px_40px_rgba(53,35,23,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="flex h-full flex-col">
        <div
          className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border)]"
          style={{ background: product.imageBackground }}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              priority={product.featured}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-[var(--muted)]">
              Image preview coming soon
            </div>
          )}

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full bg-[rgba(255,253,249,0.92)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {product.category}
            </span>
            {product.featured ? (
              <span className="rounded-full bg-[rgba(31,26,23,0.82)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--background)]">
                Featured
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                {product.brand}
              </p>
              <p className="text-lg font-semibold text-[var(--foreground)]">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                {product.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                {product.description}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-[var(--surface)] px-4 py-3">
              <dt className="text-[var(--muted)]">Rating</dt>
              <dd className="mt-1 font-semibold text-[var(--foreground)]">
                {product.rating}/5
              </dd>
            </div>
            <div className="rounded-2xl bg-[var(--surface)] px-4 py-3">
              <dt className="text-[var(--muted)]">Stock</dt>
              <dd className="mt-1 font-semibold text-[var(--foreground)]">
                {product.stock} units
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4">
            <span className="text-sm font-medium text-[var(--muted)]">
              View details
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] text-lg text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--background)]">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

import type { ReactNode } from "react";
import Image from "next/image";

import type { Product } from "@/types/product";
import { Breadcrumbs } from "./breadcrumbs";

type ProductDetailProps = {
  product: Product;
  children?: ReactNode;
};

export function ProductDetail({ product, children }: ProductDetailProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:p-8 lg:p-10">
        <Breadcrumbs currentLabel={product.title} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)]"
            style={{ background: product.imageBackground }}
          >
            <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
              <span className="rounded-full bg-[rgba(255,253,249,0.92)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {product.category}
              </span>
              {product.featured ? (
                <span className="rounded-full bg-[rgba(31,26,23,0.82)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--background)]">
                  Featured pick
                </span>
              ) : null}
            </div>

            <div className="relative aspect-[4/3]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 55vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-[var(--muted)]">
                  Product preview not available
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {product.brand}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  Product #{product.id}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl">
                  {product.title}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Price" value={`$${product.price.toFixed(2)}`} />
              <StatCard
                label="Rating"
                value={`${product.rating.toFixed(1)}/5`}
              />
              <StatCard label="Stock" value={`${product.stock} units`} />
            </div>

            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-5">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Shipping and policy details
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                {[
                  product.shippingInformation ?? "Shipping details unavailable",
                  product.warrantyInformation ??
                    "Warranty information unavailable",
                  product.returnPolicy ?? "Return policy unavailable",
                ].map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1 text-[var(--accent)]">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {children ? <div className="mt-6">{children}</div> : null}
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-4">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[1.25rem] bg-[var(--surface)] px-4 py-4">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{hint}</p>
    </div>
  );
}

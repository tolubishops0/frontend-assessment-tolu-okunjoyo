import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
};

export function ProductGrid({
  products,
  totalItems,
  currentPage,
  pageSize,
}: ProductGridProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <section className="space-y-5" aria-labelledby="products-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
            Product Listing
          </p>
          <h2
            id="products-heading"
            className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]"
          >
            Find exactly what you need{" "}
          </h2>
        </div>

        <p className="text-sm text-[var(--muted)]">
          Showing {start}-{end} of {totalItems} items
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

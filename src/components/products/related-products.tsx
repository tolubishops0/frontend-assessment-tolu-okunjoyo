import { ProductCard } from "@/components/products/product-card";
import { getRelatedProducts } from "@/lib/api/products";

type RelatedProductsProps = {
  category: string;
  currentProductId: number;
};

export async function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const products = await getRelatedProducts(category, currentProductId);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:p-8 lg:p-10">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
          More in this category
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
          Related picks from {products[0]?.category ?? "the catalog"}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

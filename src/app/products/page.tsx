import { EmptyState } from "@/components/products/empty-state";
import { Pagination } from "@/components/products/pagination";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
// import { Pagination } from "@/components/products/pagination";
// import { ProductFilters } from "@/components/products/product-filters";
// import { ProductGrid } from "@/components/products/product-grid";
import { getProductCategories, getProductListing } from "@/lib/api/products";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    query?: string;
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const listing = await getProductListing({
    page: Number(params.page) || 1,
    search: params.query,
    category: params.category,
  });

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-5 py-8 shadow-[0_20px_80px_rgba(53,35,23,0.08)] sm:px-8 sm:py-10 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,_rgba(184,92,56,0.18),_transparent_55%)]" />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[rgba(107,133,95,0.08)] blur-3xl" />

        <div className="relative space-y-8">
          <header className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)] lg:items-end">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Curated Product Explorer
              </span>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl">
                  Browse useful products with an interface built for clarity,
                  speed, and easy comparison.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                  Explore a live catalog with search, category filters, and
                  shareable browsing paths designed to make comparison simple.
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {listing?.totalItems}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Matching products
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {listing?.totalPages}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Available pages
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {listing?.categories?.length}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">Categories</p>
              </div>
            </div>
          </header>

          <ProductFilters
            categories={listing.categories}
            initialSearch={listing.search}
            initialCategory={listing.category}
          />

          {listing.items.length > 0 ? (
            <>
              <ProductGrid
                products={listing.items}
                totalItems={listing.totalItems}
                currentPage={listing.currentPage}
                pageSize={listing.pageSize}
              />
              <Pagination
                currentPage={listing.currentPage}
                totalPages={listing.totalPages}
                search={listing.search}
                category={listing.category}
              />
            </>
          ) : (
            <EmptyState search={listing.search} category={listing.category} />
          )}
        </div>
      </section>
    </main>
  );
}

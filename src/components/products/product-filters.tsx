"use client";

import { useEffect, useState } from "react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { CategoryOption } from "@/types/product";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

type ProductFiltersProps = {
  categories: CategoryOption[];
  initialSearch: string;
  initialCategory: string;
};

export function ProductFilters({
  categories,
  initialSearch,
  initialCategory,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [categoryValue, setCategoryValue] = useState(initialCategory);
  const debouncedSearchValue = useDebouncedValue(searchValue, 350);

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setCategoryValue(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const currentSearch = searchParams.get("query") ?? "";
    const currentCategory = searchParams.get("category") ?? "";
    const normalizedSearch = debouncedSearchValue.trim();

    if (
      currentSearch === normalizedSearch &&
      currentCategory === categoryValue
    ) {
      return;
    }

    const nextQuery = buildProductsQuery(
      searchParams,
      normalizedSearch,
      categoryValue,
    );

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [categoryValue, debouncedSearchValue, pathname, router, searchParams]);

  function handleCategoryChange(nextCategory: string) {
    setCategoryValue(nextCategory);
    const nextQuery = buildProductsQuery(
      searchParams,
      searchValue,
      nextCategory,
    );

    if (nextQuery === searchParams.toString()) {
      return;
    }

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }

  return (
    <section
      aria-label="Search and filter products"
      className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-raised)] p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_400px]"
    >
      <label className="space-y-2">
        <span className="text-sm font-medium text-[var(--muted)]">
          Search products
        </span>
        <input
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search by name, brand, or use case"
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--border-strong)]"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-[var(--muted)]">
          Category
        </span>
        <div className="relative">
          <select
            value={categoryValue}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className="h-12 w-full appearance-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-4 pr-10 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--border-strong)]"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 4L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </label>
    </section>
  );
}

function buildProductsQuery(
  searchParams: ReadonlyURLSearchParams,
  nextSearch: string,
  nextCategory: string,
) {
  const params = new URLSearchParams(searchParams.toString());

  if (nextSearch.trim()) {
    params.set("query", nextSearch.trim());
  } else {
    params.delete("query");
  }

  if (nextCategory) {
    params.set("category", nextCategory);
  } else {
    params.delete("category");
  }

  params.delete("page");

  return params.toString();
}

export { buildProductsQuery };

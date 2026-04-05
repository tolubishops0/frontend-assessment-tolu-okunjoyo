import { cache } from "react";

import type {
  DummyJsonCategory,
  DummyJsonProduct,
  DummyJsonProductsResponse,
} from "@/types/dummyjson";
import type { ProductListing } from "@/types/product";
import {
  formatCategoryLabel,
  mapDummyJsonProduct,
  PRODUCTS_PAGE_SIZE,
} from "@/lib/utils/products";

const DUMMY_JSON_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
type ProductQuery = {
  page?: number;
  search?: string;
  category?: string;
};

export const getProductCategories = cache(async () => {
  const categories = await fetchJson<DummyJsonCategory[]>(
    `${DUMMY_JSON_BASE_URL}/products/categories`,
    { next: { revalidate: 60 * 60 * 24 } },
  );

  return categories.map((category) => ({
    label: category.name,
    value: category.slug,
  }));
});

export async function getProductListing(
  query: ProductQuery,
): Promise<ProductListing> {
  const page = Math.max(1, query.page ?? 1);
  const search = query.search?.trim() ?? "";
  const category = query.category?.trim() ?? "";
  const categories = await getProductCategories();

  if (search && category) {
    return getCombinedSearchCategoryListing({
      page,
      search,
      category,
      categories,
    });
  }

  const skip = (page - 1) * PRODUCTS_PAGE_SIZE;

  if (search) {
    const response = await fetchJson<DummyJsonProductsResponse>(
      `${DUMMY_JSON_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`,
      { next: { revalidate: 60 * 30 } },
    );

    return buildListingFromResponse(
      response,
      categories,
      page,
      search,
      category,
    );
  }

  if (category) {
    const response = await fetchJson<DummyJsonProductsResponse>(
      `${DUMMY_JSON_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`,
      { next: { revalidate: 60 * 30 } },
    );

    return buildListingFromResponse(
      response,
      categories,
      page,
      search,
      category,
    );
  }

  const response = await fetchJson<DummyJsonProductsResponse>(
    `${DUMMY_JSON_BASE_URL}/products?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`,
    { next: { revalidate: 60 * 30 } },
  );

  return buildListingFromResponse(response, categories, page, search, category);
}

export async function getProductById(id: number) {
  const product = await fetchJson<DummyJsonProduct>(
    `${DUMMY_JSON_BASE_URL}/products/${id}`,
    { next: { revalidate: 60 * 60 } },
  );

  return mapDummyJsonProduct(product);
}

export async function getRelatedProducts(category: string, excludeId: number) {
  const response = await fetchJson<DummyJsonProductsResponse>(
    `${DUMMY_JSON_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${PRODUCTS_PAGE_SIZE}`,
    { next: { revalidate: 60 * 30 } },
  );

  return response.products
    .filter((product) => product.id !== excludeId)
    .slice(0, 3)
    .map(mapDummyJsonProduct);
}

function buildListingFromResponse(
  response: DummyJsonProductsResponse,
  categories: Awaited<ReturnType<typeof getProductCategories>>,
  page: number,
  search: string,
  category: string,
): ProductListing {
  return {
    items: response.products.map(mapDummyJsonProduct),
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(response.total / PRODUCTS_PAGE_SIZE)),
    totalItems: response.total,
    pageSize: PRODUCTS_PAGE_SIZE,
    categories,
    search,
    category,
  };
}

async function getCombinedSearchCategoryListing({
  page,
  search,
  category,
  categories,
}: {
  page: number;
  search: string;
  category: string;
  categories: Awaited<ReturnType<typeof getProductCategories>>;
}) {
  const response = await fetchJson<DummyJsonProductsResponse>(
    `${DUMMY_JSON_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=0`,
    { next: { revalidate: 60 * 30 } },
  );

  const filteredProducts = response.products.filter(
    (product) => product.category === category,
  );
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PRODUCTS_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PRODUCTS_PAGE_SIZE;

  return {
    items: filteredProducts
      .slice(startIndex, startIndex + PRODUCTS_PAGE_SIZE)
      .map(mapDummyJsonProduct),
    currentPage,
    totalPages,
    totalItems,
    pageSize: PRODUCTS_PAGE_SIZE,
    categories,
    search,
    category,
  };
}

async function fetchJson<T>(
  input: string,
  init?: RequestInit & { next?: NextFetchRequestConfig },
) {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from DummyJSON: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getFallbackCategoryLabel(category: string) {
  return formatCategoryLabel(category);
}

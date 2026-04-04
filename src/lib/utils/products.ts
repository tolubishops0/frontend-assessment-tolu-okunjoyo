import type { DummyJsonProduct } from "@/types/dummyjson";
import type { Product } from "@/types/product";

export const PRODUCTS_PAGE_SIZE = 9;

export function formatCategoryLabel(value: string) {
  if (!value) return "";
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function mapDummyJsonProduct(product: DummyJsonProduct): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: formatCategoryLabel(product.category),
    categorySlug: product.category,
    brand: product.brand ?? "Independent Brand",
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    featured: product.rating >= 4.8 || product.stock >= 75,
    imageUrl: product.thumbnail ?? product.images?.[0],
    imageBackground: getImageBackground(product.id),
    gallery: product.images ?? [],
    shippingInformation: product.shippingInformation,
    warrantyInformation: product.warrantyInformation,
    availabilityStatus: product.availabilityStatus,
    returnPolicy: product.returnPolicy,
  };
}

function getImageBackground(seed: number) {
  const gradients = [
    "linear-gradient(135deg, #f4e2d8 0%, #f8f3ed 50%, #d6b39e 100%)",
    "linear-gradient(135deg, #e8eadf 0%, #f7f4ec 55%, #b4c5a5 100%)",
    "linear-gradient(135deg, #ead5cf 0%, #f8f3ed 55%, #b85c38 100%)",
    "linear-gradient(135deg, #ddd7cf 0%, #f7f4ec 50%, #988a7e 100%)",
  ];

  return gradients[seed % gradients.length];
}

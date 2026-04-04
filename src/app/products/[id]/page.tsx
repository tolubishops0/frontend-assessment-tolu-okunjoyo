import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RelatedProducts } from "@/components/products/related-products";
import { RelatedProductsSkeleton } from "@/components/products/product-skeletons";
import { getProductById } from "@/lib/api/products";
import { ProductDetail } from "@/components/products/product-detail";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  try {
    const product = await getProductById(productId);

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.imageUrl ? [product.imageUrl] : [],
      },
    };
  } catch {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  let product;

  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  return (
    <ProductDetail product={product}>
      <Suspense fallback={<RelatedProductsSkeleton />}>
        <RelatedProducts
          category={product.categorySlug}
          currentProductId={product.id}
        />
      </Suspense>
    </ProductDetail>
  );
}

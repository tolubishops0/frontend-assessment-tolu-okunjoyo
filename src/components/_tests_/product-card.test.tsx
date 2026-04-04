import { screen, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@/test/mocks";
import { ProductCard } from "../products/product-card";
import { Product } from "@/types/product";

const product: Product = {
  id: 7,
  title: "Velour Chair Edition",
  description: "A sculpted chair for calm workspaces.",
  category: "Furniture",
  categorySlug: "furniture",
  brand: "Velour",
  price: 129.5,
  rating: 4.6,
  stock: 14,
  featured: true,
  imageUrl: "https://cdn.dummyjson.com/product-images/furniture/chair.webp",
  imageBackground:
    "linear-gradient(135deg, #f4e2d8 0%, #f8f3ed 50%, #d6b39e 100%)",
  gallery: [],
};

describe("ProductCard", () => {
  it("renders the product metadata and produt detail link", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByRole("heading", { name: product.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Velour")).toBeInTheDocument();
    expect(screen.getByText("$129.50")).toBeInTheDocument();
    expect(screen.getByText("4.6/5")).toBeInTheDocument();
    expect(screen.getByText("14 units")).toBeInTheDocument();
  });

  it("displays a graceful fallback when image is unavailable", () => {
    render(
      <ProductCard
        product={{
          ...product,
          imageUrl: undefined,
          featured: false,
        }}
      />,
    );

    expect(screen.getByText("Image preview coming soon")).toBeInTheDocument();
    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
  });
});

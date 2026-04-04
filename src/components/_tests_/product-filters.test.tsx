import { describe, expect, it } from "vitest";
import { buildProductsQuery } from "../products/product-filters";
import type { ReadonlyURLSearchParams } from "next/navigation";

describe("buildProductsQuery", () => {
  it("build search, category and page number", () => {
    const params = new URLSearchParams(
      "page=1&sort=title",
    ) as unknown as ReadonlyURLSearchParams;
    const query = buildProductsQuery(params, "chair", "furniture");

    expect(query).toBe("sort=title&query=chair&category=furniture");
  });

  it("removes empty search and category values from the URL", () => {
    const params = new URLSearchParams(
      "query=chair&category=furniture&page=2",
    ) as unknown as ReadonlyURLSearchParams;

    const query = buildProductsQuery(params, "   ", "");

    expect(query).toBe("");
  });
});

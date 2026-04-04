import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProductsLoading from "@/app/products/loading";

describe("ProductsLoading", () => {
  it("renders the listing skeleton instead of a bare spinner", () => {
    const { container } = render(<ProductsLoading />);

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0,
    );
  });
});

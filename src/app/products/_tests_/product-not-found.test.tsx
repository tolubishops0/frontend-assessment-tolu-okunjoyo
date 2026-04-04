import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductNotFound from "../[id]/not-found";

describe("ProductNotFound", () => {
  it("renders a not found message", () => {
    render(<ProductNotFound />);
    expect(screen.getByText("Product not found")).toBeInTheDocument();
  });
});

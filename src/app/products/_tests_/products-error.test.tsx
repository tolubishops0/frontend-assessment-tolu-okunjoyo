import ProductsError from "../error";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import "@/test/mocks";

describe("ProductsError", () => {
  it("renders a graceful error and retry messsage ", () => {
    const reset = vi.fn();

    render(<ProductsError error={new Error()} reset={reset} />);

    expect(
      screen.getByRole("heading", {
        name: /we couldn't load this product view/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to products/i }),
    ).toHaveAttribute("href", "/products");

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});

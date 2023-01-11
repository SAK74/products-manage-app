import { render, screen, waitFor } from "@testing-library/react";
import SimplyProduct from "components/Product";
import ProductsList from "components/ProductsList";
import { customRender } from "./wrapper";

describe("Product list testing", () => {
  beforeEach(() => {
    customRender(<ProductsList />);
  });

  it("Should be render a table", () => {
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("Should be render 5 rows by default", async () => {
    const productRows = await screen.findAllByTestId("product");
    expect(productRows).toHaveLength(5);
  });
});

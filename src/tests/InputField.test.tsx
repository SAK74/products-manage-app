import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "components";
import ProductsList from "components/ProductsList";
import generateRandomString from "./randomString";
import { customRender } from "./wrapper";

describe("Testing Input field", () => {
  let input: HTMLInputElement;
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    customRender(<InputField />);
    input = screen.getByRole("textbox");
    submitBtn = screen.getByRole("button");
  });

  it("Should be render input field", () => {
    expect(input).toBeInTheDocument();
  });

  it("Search submitBtn should be disabled default", () => {
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it("Search submitBtn should be enabled after input filled", async () => {
    // waiting to define total of products
    customRender(<ProductsList />);
    await screen.findAllByTestId("product");

    const value = ((Math.random() * 11 + 1) ^ 0).toString();
    userEvent.type(input, value);
    expect(input).toHaveValue(value);
    expect(submitBtn).toBeEnabled();
  });

  it("Input should accept only number value", () => {
    const { randomString, numericString } = generateRandomString(20);
    userEvent.type(input, randomString);
    expect(input).toHaveValue(numericString);
  });
});

import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { describe, expect } from "vitest";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // exact: false: partial match
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  }); // need to use await: not going to populate untill option get from server

  await user.clear(vanillaInput); // clear the value of an input field https://testing-library.com/docs/user-event/utility
  await user.type(vanillaInput, "1"); // type the new value
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // updata chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"toppings"} />);

  // make sure total starts out at $0.00
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingSubtotal).toHaveTextContent("0.00");
  // Tick Hot fudge topping, and check subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
  // Tick Cheery topping, and check subtotal
  const cherryCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherryCheckbox);
  expect(toppingSubtotal).toHaveTextContent("3.00");
  // Tick Hot fudge tooping off, and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");
    const cherryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherryCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const cheeryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cheeryCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const cheeryCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cheeryCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
    await user.click(cheeryCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});

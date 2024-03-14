import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("summary form test", () => {
  test("check checkbox innitial", () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonElement = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();
  });

  test("check checkbox and enables button", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkboxElement = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonElement = screen.getByRole("button", {
      name: /confirm order/i,
    });

    await user.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    await user.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
  });
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  // popover starts out hidden

  // popover apperas on mouseover of checkbox label

  // popover disappears when we mouse out
});

import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOptions from "../ScoopOption";

test("red input box for invalid scoop count", async () => {
  // Render scoop option
  const user = userEvent.setup();
  render(<ScoopOptions name="Vanilla" imagePath="/images/vanilla.png" />);
  // Find input box
  const vanillaInput = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });
  // Type invalid input: "minus number" and check is-invalid class
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");
  // Type invalid input: "decimal number" and check is-invalid class
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.5");
  expect(vanillaInput).toHaveClass("is-invalid");
  // Type invalid input: number than 10 and check is-invalid class
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "15");
  expect(vanillaInput).toHaveClass("is-invalid");
  // Type valid input: "plus number"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  // The is-invalid class should be gone
  expect(vanillaInput).not.toHaveClass("is-invalid");
});

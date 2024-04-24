import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

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

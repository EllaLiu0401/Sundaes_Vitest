import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  const user = userEvent.setup();
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(hotFudgeCheckbox);

  // find and click order button
  const orderButton = await screen.findByRole("button", {
    name: "Order Sundaes",
  });
  await user.click(orderButton);

  // check summary information based on order
  const summaryScoopsHeading = await screen.findByRole("heading", {
    name: /Scoops:/i,
  });
  expect(summaryScoopsHeading).toHaveTextContent("2.00");
  const summaryToppingsHeading = await screen.findByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(summaryToppingsHeading).toBeInTheDocument();

  // expect(screen.getByText("1 Vanilla")).toBeIntheDocument();
  // expect(screen.getByText("Hot fudge")).toBeIntheDocument();
  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(["1 Vanilla", "Hot fudge "]);

  const summaryHeading = await screen.findByRole("heading", { name: /Total/i });
  expect(summaryHeading).toHaveTextContent("3.50");

  // accpet terms and conditions and click button to confirm order
  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const buttonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  await user.click(buttonElement);

  // expect 'loading' to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /Thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  // click 'new order' button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /Create new order/i,
  });
  await user.click(newOrderButton);
  // check that scoops and toppings have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // unmount the component to trigger cleanup and avoid
  unmount();
});

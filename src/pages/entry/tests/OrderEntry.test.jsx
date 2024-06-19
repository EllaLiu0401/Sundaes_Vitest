import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByText(
    "An unexpected error occurred. Please try again later"
  );
  expect(alerts).toHaveLength(2);
});

test("disable order button for no scoops", async () => {
  const user = userEvent.setup();
  render(<OrderEntry />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const orderButton = await screen.findByRole("button", {
    name: "Order Sundaes",
  });

  expect(orderButton).toBeDisabled();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});

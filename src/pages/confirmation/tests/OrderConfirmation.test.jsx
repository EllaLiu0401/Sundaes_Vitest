import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

test.skip("error response from server for submitting order", async () => {
  server.resetHandlers(http.post("http://localhost:3030/order"), () => {
    return new HttpResponse(null, { status: 500 });
  });

  render(<OrderConfirmation />);
  const alerts = await screen.findByRole("alert");
  expect(alerts).toHaveTestContent(
    "An unexpected error occurred. Please try again later"
  );
});

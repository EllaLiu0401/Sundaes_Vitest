import { useState } from "react";
import Containter from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");
  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <OrderDetailsProvider>
      <Containter>{<Component setOrderPhase={setOrderPhase} />}</Containter>
    </OrderDetailsProvider>
  );
}

export default App;

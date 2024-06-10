import Containter from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <Containter>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Containter>
  );
}

export default App;

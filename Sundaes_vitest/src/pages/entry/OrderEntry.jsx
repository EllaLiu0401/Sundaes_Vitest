import Options from "./Options";
import { userOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/esm/Button";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = userOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.toppings + totals.scoops)}</h2>
      <Button
        onClick={() => {
          setOrderPhase("review");
        }}
      >
        Order Sundaes
      </Button>
    </div>
  );
}

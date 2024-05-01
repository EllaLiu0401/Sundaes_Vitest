import Options from "./Options";
import { userOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry() {
  const { totals } = userOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.toppings + totals.scoops)}</h2>
    </div>
  );
}

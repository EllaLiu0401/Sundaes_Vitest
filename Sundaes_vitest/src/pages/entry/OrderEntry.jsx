import Options from "./Options";
import { userOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = userOrderDetails();
  const orderDisable = totals.scoops === 0;
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.toppings + totals.scoops)}</h2>
      <Button
        onClick={() => {
          setOrderPhase("review");
        }}
        disabled={orderDisable}
      >
        Order Sundaes
      </Button>
    </div>
  );
}

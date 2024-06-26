import React from "react";
import SummaryForm from "./SummaryForm";
import { userOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = userOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [['chocolate', 2], ['vanilla', 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(optionCounts.toppings); // ['M&Ms', 'Gummi bears']
  const toppingList = toppingArray.map((key) => <li key={key}>{key} </li>);
  const toppingSummary = totals.toppings ? (
    <>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
    </>
  ) : null;
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingSummary}
      <h2>Total: {(totals.scoops + totals.toppings).toFixed(2)}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

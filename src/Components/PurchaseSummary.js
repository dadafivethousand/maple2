import React from 'react';
import '../Stylesheets/Purchase.css'; // CSS for combining form and summary
import { useAppContext } from '../AppContext'; 
export default function PurchaseSummary() {
  const {price, type, frequency} = useAppContext();

  return (
    <div className="purchase-summary">
      <h3>Summary</h3>
      <p>{type} <br></br> 
      ${price} ({frequency})</p>
      <hr />
      <p>Subtotal: ${price}</p>
      <p>HST: ${price * 0.13}</p>
      <hr />
      <p>Total: ${price * 1.13}</p>
    </div>
  );
}

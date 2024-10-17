import React from 'react';
import '../Stylesheets/PurchaseSummary.css'; // Separate CSS for the summary

export default function PurchaseSummary({type, amount, frequency}) {
  return (
    <div className="purchase-summary">
      <h3>Summary</h3>
      <p>{type}: $ {amount} ({frequency})</p>
      <hr />
      <p>Subtotal: ${amount}</p>
      <p>HST: ${amount * 0.13}</p>
      <hr />
      <p>Total: ${amount * 1.13}</p>
    </div>
  );
}

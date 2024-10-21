import React from 'react';
import { useState, useEffect } from 'react';
import '../Stylesheets/Purchase.css'; // CSS for combining form and summary
import { useAppContext } from '../AppContext'; 
export default function PurchaseSummary() {
  const {price, type, frequency} = useAppContext();
  const [formattedPrice, setFormattedPrice] = useState(null)
  const [formattedHST, setFormattedHST] = useState(null)
  const [formattedFinalPrice, setFormattedFinalPrice] = useState(null)
  useEffect(()=>{
    setFormattedHST((price * 0.13).toFixed(2))
    setFormattedFinalPrice((price * 1.13).toFixed(2))
  },[])

  return (
    <div className="purchase-summary">
      <h3>Order Summary</h3>
      <p>{type} <br></br> 
      ${price} ({frequency})</p>
      <hr />
      <p>Subtotal: ${price}</p>
      <p>13% HST: ${formattedHST}</p>
      <hr />
      <p>Total: ${formattedFinalPrice}</p>
    </div>
  );
}

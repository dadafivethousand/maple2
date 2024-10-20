import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useAppContext } from '../AppContext'; 
import PurchaseSummary from './PurchaseSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import '../Stylesheets/Purchase.css'; // CSS for combining form and summary

export default function Purchase() {
  const {setPrice, setType, setFrequency} = useAppContext();
  const cancelPurchase=()=>{
    setPrice(null)
    setType(null)
    setFrequency(null)
}
  return (
    <div className="purchase-container">
      <div className="close-btn">
        <button  onClick={cancelPurchase}>
                    <FontAwesomeIcon icon={faTimes} className="rotated-plus" /> {/* Use the icon here */}
                </button>
                </div>
      <PurchaseForm />
      <PurchaseSummary />
    </div>
  );
}

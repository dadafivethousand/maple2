import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useAppContext } from '../AppContext'; 
import PurchaseSummary from './PurchaseSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import '../Stylesheets/Purchase.css'; // CSS for combining form and summary
import img from '../Media/img.png'

export default function Purchase() {
  const {setPrice, setType, setFrequency, setFormData} = useAppContext();
  const cancelPurchase=()=>{
    setPrice(null)
    setType(null)
    setFrequency(null)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      address: '',
      unit: '',
      city: '',
      province: 'ON', // Default province
      postalCode: ''
    })
}
  return (
    <div className="purchase-outer-container">
         <div className="close-btn">
        <a href='#Pricing' onClick={cancelPurchase}>
                    <FontAwesomeIcon icon={faTimes} className="rotated-plus" /> {/* Use the icon here */}
                </a>
                </div>
      <img src={img} />
      <div className="purchase-container"> 
   
      <PurchaseForm />
      <PurchaseSummary />
    </div>
    </div>
  );
}

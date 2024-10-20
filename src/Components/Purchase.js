import React from 'react';
import PurchaseForm from './PurchaseForm';
import PurchaseSummary from './PurchaseSummary';
import '../Stylesheets/Purchase.css'; // CSS for combining form and summary

export default function Purchase() {
  return (
    <div className="purchase-container">
      <PurchaseForm />
      <PurchaseSummary />
    </div>
  );
}

import React from 'react';
import '../Stylesheets/Purchase.css'; // CSS for combining form and summary

export default function PurchaseForm() {
  return (
    <div className='purchase-form-container'>
       <form  >
    <div className="purchase-form">
      <h2>Personal Details</h2>
     
        <div className='grid-form'>
        <div className="form-group">
          <label>First Name*</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div className="form-group">
          <label>Last Name*</label>
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <label>Email Address*</label>
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="form-group">
          <label>Phone number*</label>
          <input type="tel" placeholder="Phone number" />
        </div>
        <div className="form-group">
          <label>Birth Date (dd-mm-yyyy)*</label>
          <input type="text" placeholder="DD-MM-YYYY" />
        </div>
       
       
    
       
        </div>
 
      
    </div>
    <div className="purchase-form address-info">
      <h2>Address Information</h2>
     
        <div className='grid-form'>
     
        <div className="form-group">
          <label>Address*</label>
          <input type="text" placeholder="Building #, Street/Ave" />
        </div>
        <div className="form-group">
          <label>Unit / Apartment #</label>
          <input type="text" placeholder="Unit / Apartment #" />
        </div>
       
        <div className="form-group">
          <label>City / Town*</label>
          <input type="text" placeholder="City / Town" />
        </div>

        <div className='field-flex'>
        <div className="form-group half">
          <label>Province*</label>
          <select>
          <option>ON</option>
          <option>QC</option>
          <option>BC</option>
          <option>AB</option>
          <option>MB</option>
          <option>SK</option>
          <option>NB</option>
          <option>NL</option>
          <option>NS</option>
          <option>PE</option>
          <option>NT</option>
          <option>NU</option>
          <option>YT</option>
                      
          </select>
        </div>

        <div className="form-group half">
          <label>Postal Code</label>
          <input type="text" placeholder="Postal Code" />
        </div>
        </div>
        </div>
      
     
       
    </div>
    </form>
    </div>
  );
}

import React from 'react';

export default function PrimaryForm({ primaryData, handlePrimaryChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handlePrimaryChange({
            [name]: value
        });
    };

    return (
        <div className='primary-form-container'>
        <form >
            {/* Primary User Info */}
            <h2>Personal Information</h2>
       <div className="FoundersForm">
            <div className="formGroup name">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={primaryData.firstName} onChange={handleChange} required />
            </div>

            <div className="formGroup last-name">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={primaryData.lastName} onChange={handleChange} required />
            </div>
    
        

         
            <div className="formGroup">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={primaryData.phoneNumber} onChange={handleChange} required />
            </div>
            
            <div className="formGroup">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={primaryData.email} onChange={handleChange} required />
            </div>

          
    
            </div>
            <h2>Address Information</h2>
            <div className="FoundersForm">
            <div className="formGroup">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" value={primaryData.address} onChange={handleChange} required />
            </div>

            <div className="formGroup">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={primaryData.city} onChange={handleChange} required />
            </div>

            <div className="formGroup">
                <label htmlFor="province">Province</label>
                <select id="province" name="province" value={primaryData.province} onChange={handleChange}>
                    <option value="Ontario">Ontario</option>
                    <option value="Quebec">Quebec</option>
                    {/* Add more provinces as needed */}
                </select>
            </div>

            <div className="formGroup">
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" value={primaryData.postalCode} onChange={handleChange} required />
            </div>

       
            </div>

            <h2>Comments/Questions</h2>
            

            <div className="FoundersForm">
    <div className="formGroup full-width`">
         <textarea 
            id="comments" 
            name="comments" 
            value={primaryData.comments} 
            onChange={handleChange} 
            required 
            rows="5"  /* Adjust for the desired height */
            cols="100" /* Adjust for the desired width */
        />
    </div>
</div>

        </form>
        </div>
    );
}

import './Stylesheets/Membership.css'

export default function Membership({ index, type, price, billed, cancel }) {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(amount);
      };
    return(
        <div className='MembershipContainer'>
      
          
         <div  className='MembershipType'>  {type}</div> 
         <div>
     <div className='Price'> {formatCurrency(price)} <span className='hst'> + HST</span>  </div> 
         {billed? <div className='billed'> {billed}</div>: null}
        
         </div>
         <div className='Cancel'> {cancel? cancel: ''} </div>
            <div >
                <button className='PurchaseButton'>Purchase</button>
            </div>

        </div>
    )
}
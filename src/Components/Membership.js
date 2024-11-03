import '../Stylesheets/Membership.css'
import Ribbon from './Ribbon';
import BottomRibbon from './BottomRibbon'
 
export default function Membership({  type, price, billed, cancel, promo, paymentLink }) {
     const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(amount);
      };
 
    return(
        <div className={`${promo? 'promo': ''} MembershipContainer`}>
         {/* Render the Ribbon component only if it's a promotional item */}
         {promo && (
          
                <Ribbon 
                    topText="GRAND OPENING PROMO" 
                    
                />
 
            )}
          
         <div  className='MembershipType'> <h6> {type }   </h6></div> 
         <div>
     <div className='Price'> {formatCurrency(price)} <span className='hst'> + HST</span>  </div> 
         {billed? <div className='billed'> {billed}</div>: null}
        
         </div>
         <div className='Cancel'> {cancel? cancel: ''} </div>
            <div className='PurchaseButton'>
                <a href={paymentLink} className='PurchaseButton'>Purchase</a>
            </div>

            {promo && (
          
          <BottomRibbon 
              topText="Save $40 per month!"
               bottomText="Only 10 spots available"
          />

      )}

        </div>
    )
}
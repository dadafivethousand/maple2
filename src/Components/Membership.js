import '../Stylesheets/Membership.css'
import Ribbon from './Ribbon';
import BottomRibbon from './BottomRibbon'
import { useAppContext } from "../AppContext";
 
export default function Membership({ free, type, price, billed, cancel, promo, paymentLink, kids }) {
  const { showForm, setShowForm, setShowKidForm} = useAppContext();      
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
     <div className='Price'>
  
      { free ? <p>Free</p> : <>{formatCurrency(price)} <span className='hst'> + HST</span></> }

       </div> 
         {billed? <div className='billed'> {billed}</div>: null}
        
         </div>
         <div className='Cancel'> {cancel? cancel: ''} </div>
            
          {free ? (
              <div onClick={() => setShowForm(true)} className="PurchaseButton">Start</div>
            ) : (
              <a
                href={!kids ? paymentLink : undefined} // Only set href if kids is false
                target="_blank"
                onClick={(e) => {
                  if (kids) {
                    e.preventDefault(); // Prevent navigation if kids is true
                    setShowKidForm(true);
                  }
                }}
                className="PurchaseButton"
              >
                Purchase
              </a>
            )}

         

            {promo && (
          
          <BottomRibbon 
              topText="Save $40 per month!"
               bottomText="Only 3 Spots Remaining"
          />

      )}

        </div>
    )
}
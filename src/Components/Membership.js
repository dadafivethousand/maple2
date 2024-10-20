import '../Stylesheets/Membership.css'
import { useAppContext } from '../AppContext'; 
export default function Membership({ index, type, price, billed, cancel }) {
    const {setPrice, setType, setFrequency} = useAppContext();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(amount);
      };
    const membershipDetails=()=>{
        setPrice(price)
        setType(type)
        setFrequency(billed)
    }
    return(
        <div className='MembershipContainer'>
      
          
         <div  className='MembershipType'>  {type}</div> 
         <div>
     <div className='Price'> {formatCurrency(price)} <span className='hst'> + HST</span>  </div> 
         {billed? <div className='billed'> {billed}</div>: null}
        
         </div>
         <div className='Cancel'> {cancel? cancel: ''} </div>
            <div >
                <button onClick={membershipDetails} className='PurchaseButton'>Purchase</button>
            </div>

        </div>
    )
}
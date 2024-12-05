import '../Stylesheets/getStarted.css'
 
import { useAppContext } from "../AppContext";
export default function GetStarted({size}){
    const { showForm, setShowForm } = useAppContext();   
    
    return(
        <div className='get-started-container'>
            <div onClick={()=>setShowForm(true)} className={`${size == 'large'? 'large' : ''} get-started-button`}>
            Start Free Trial
          <span className='little-letters'>Beginners Welcome!</span> 
            </div>  
         
            
        </div>
    )
}
import '../Stylesheets/getStarted.css'
import LeadForm from '../LeadForm'
import { useState } from 'react'
import { useAppContext } from "../AppContext";
export default function GetStarted({size}){
    const { showForm, setShowForm } = useAppContext();   
    
    return(
        <div className='get-started-container'>
            <div onClick={()=>setShowForm(true)} className={`${size == 'large'? 'large' : ''} get-started-button`}>
            Get Started Now
            </div>  
         
            
        </div>
    )
}
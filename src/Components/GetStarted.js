import '../Stylesheets/getStarted.css'
import { useState, useEffect } from 'react';
 
import { useAppContext } from "../AppContext";
export default function GetStarted({size}){
    const { showForm, setShowForm } = useAppContext();   
    const [phrase, setPhrase] = useState("")

    useEffect(() => {
        let timeoutId;
        let intervalId;
    
        timeoutId = setTimeout(() => {
            const text = "Start Free Trial";
            let i = 0;
    
            intervalId = setInterval(() => {
                setPhrase(text.substring(0, i + 1));
                i++;
                if (i > text.length) {
                    clearInterval(intervalId);
                }
            }, 100);
        }, 100);
    
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, []);
    
    
    return(
        <div className='get-started-container'>
            <div onClick={()=>setShowForm(true)} className={`${size == 'large'? 'large' : ''} get-started-button`}>
           {phrase}
       
            </div>   
        </div>
    )
}
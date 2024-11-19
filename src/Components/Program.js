import { useState, useEffect } from "react"
export default function Program( {program} ){
   const [show, setShow] = useState(false)
   const handleClick=()=>{
      setShow((prev)=>!prev)
   }
    return(
        <div   className="program-container animate">
         <div className="overlay">     <h2>{program.name}</h2>
         <p>{program.description}</p> </div>
             <div className={`${show? 'dim':''} program-image`}>
                <img alt={program.name} src={program.image} />
             </div>
         
             <div className={`${show? 'hiding':''} program-title`}>
            
                </div>

           <div className={`${show? '':'hiding'} program-description`}>
                <p>{program.description}</p>
             </div>
             </div>
    )
}
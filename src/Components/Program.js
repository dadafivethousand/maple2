import { useState, useEffect } from "react"
export default function Program( {program} ){
   const [show, setShow] = useState(false)
   const handleClick=()=>{
      setShow((prev)=>!prev)
   }
    return(
        <div onClick={handleClick} className="program-container">
             <div className={`${show? 'dim':''} program-image`}>
                <img src={program.image} />
             </div>
         
             <div className={`${show? 'hiding':''} program-title`}>
                <h2>{program.name}</h2>
                </div>

           <div className={`${show? '':'hiding'} program-description`}>
                <p>{program.description}</p>
             </div>
             </div>
    )
}
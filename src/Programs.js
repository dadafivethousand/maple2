import './Stylesheets/Programs.css'
import programs from './Objects/ProgramObject'
import Program from './Components/Program'

export default function Programs() {
    return(
        <div id='programs' className="programs-container">
            <h1 className='animate'>Programs</h1>
         
      

            <div className="programs">
    
        {
                programs.map((program, index) =>{
                    return(               
                        <Program  key={index} program={program} />        
                    )
                })
            }


</div>
        </div>
    )
}
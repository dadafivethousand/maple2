import './Stylesheets/Landing.css';
import leaf from './Media/leaf.png'
export default function Landing() {
    return (
        <div className="LandingContainer">
            <div>
                <div className='NameAndLeaf'>
                <img src={leaf}/>
            <h1> <span className='Crimson'>Maple Jiu-Jitsu Academy</span>  </h1>
           
            </div>
           <div className='MoveDown'>
            <h2 className='Center'>A better way to Train</h2>
            <h3 className='Center'>No Contracts | No sales tactics | Just training</h3>
            <div>
            
          
       
          <div className="Center ButtonContainer">
              <button className="GetStartedButton">Sign Up <br></br>  </button>
              <button className="ViewPlansButton"> View Prices</button>
          </div>
          </div>
          </div>
            </div>
 
        </div>
    );
}

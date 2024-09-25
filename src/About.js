import './Stylesheets/About.css'
 

export default function About(){
 
    return(
        <div id='About' className='AboutContainer'>
                  
            <h1>  <span className='White'> About </span> <span className='Crimson'> Maple Jiujitsu </span></h1>
           <p> At Maple Jiu-Jitsu Academy, we are committed to delivering a top-tier training experience for all skill levels. Our passion for Brazilian Jiu-Jitsu goes beyond just techniques; it’s about building a strong, inclusive community where everyone can grow, learn, and thrive.</p>
            <div className='AboutTextAndVideo'>
                             <ul>
                 
                <li> <div className='IconWrapper'> <i class="fas fa-map-marker-alt"></i> </div>First Brazilian Jiujitsu Academy in Maple, Ontario</li>
                <li><div className='IconWrapper'>  <i class="fas fa-shield-alt"></i></div> Safe and healthy training atmosphere </li>
                <li > <div className='IconWrapper'> <i class="fas fa-book-open"></i> </div> Structured and comprehensive curriculum</li>

            </ul>

            <ul>
            <li> <div className='IconWrapper'> <i class="fas fa-users"></i> </div> Comitted to fostering an inclusive environment</li>
                <li> <div className='IconWrapper'> <i class="fas fa-building"></i> </div> Conveniently located premium facility</li>
                <li> <div className='IconWrapper'> <i class="fas fa-trophy"></i> </div> Top level professional instruction</li>
            </ul>

   

            
            </div>
            <p> Whether you're looking to compete, get in shape, or learn self-defense, Maple Jiu-Jitsu Academy is the place to start your journey. Join us today and become part of our family!</p>
        </div>
    )

}
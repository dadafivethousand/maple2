import '../Stylesheets/Coaches.css'
import Belt from './Belt'
import { useState, useEffect } from 'react'

export default function Coach({ coach }){
    const [showProfile, setShowProfile] = useState(false)
    const [slide, setSlide] = useState(false)
    const toggleShowProfile = () => {
        setShowProfile(prev => !prev)
    }

    useEffect(() => {
        if (showProfile) {
            // Set slide to true after showProfile becomes true
            setSlide(true)
        } else {
            // Reset slide to false when hiding the profile
            setSlide(false)
        }
    }, [showProfile])
    return(
        <div onClick={toggleShowProfile} className="coach-container animate">
            <div className='image-overlay'>
            </div>
            <div className={`${showProfile ? 'dim' : ''} coach-photo`} >
                <img alt='Brazillian Jiu-Jitsu Instructor' src={coach.image} />
            </div>
            <div className='coach-belt'>
                <Belt belt={coach.belt} />
            </div>
            <div className='name-and-bio'>
            <div className={`coach-name ${slide ? 'slide' : ''}`}>
                {coach.name}
            </div>
           
            <div className={`coach-bio ${slide ? 'slide' : ''}`}>
                {coach.description}
            </div>

            <div className={`coach-accomplishments ${slide ? 'slide' : ''}`}>
                {coach.accomplishments.map((acc, index)=>{
                    return(
                        <p key={index}>-{acc}</p>
                    )
                })}
            </div>
            </div>
        </div>
    )

}
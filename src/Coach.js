import Belt from "./Belt"
import "./Stylesheets/Coach.css"
import { useState, useEffect } from 'react'

export default function Coach({ coach }) {
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

    return (
        <div className="CoachContainer">
            <div onClick={toggleShowProfile} className="Coach">
                <img 
                    className={`${showProfile ? 'Dim' : ''} ProfilePic animate`} 
                    src={coach.image} 
                    alt="Coach"
                />
                { showProfile && (
                    <div className="Profile">
                        <div className={`Name ${slide ? 'Slide' : ''}`}>
                            {coach.name}
                        </div>
                        <br />
                        <div className={`CoachDescription ${slide ? 'Slide' : ''}`}>
                            {coach.description}
                        </div>  
                        {coach.accomplishments && (
                            <ul className={`AccomplishmentsList ${slide ? 'Slide' : ''}`}>
                                {coach.accomplishments.map((acc, index) => (
                                    <li key={index}>{acc}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                <Belt belt={coach.belt} />
            </div>
        </div>
    )
}

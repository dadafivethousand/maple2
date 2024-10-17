import './Stylesheets/Programs.css'
import programs from './Objects/ProgramObject'
import Program from './Components/Program'

export default function Programs() {
    return(
        <div className="programs-container">
            <h1>Programs</h1>
            <p>At Maple Jiu-Jitsu Academy, we provide comprehensive programs for individuals of all experience levels. 
                Whether you're new to BJJ or an experienced practitioner, you'll feel right at home in our welcoming and inclusive environment. 
                Our focus is on helping you build your skills, improve fitness, and develop confidence through Brazilian Jiu-Jitsu, all while being part of a supportive community. </p>

                <br>
                </br>

        <p>Click on the images to learn more about each program.</p>

        {
                programs.map((program, index) =>{
                    return(
                        <>
                        <Program program={program} />
                        </>
                    )
                })
            }


        </div>
    )
}
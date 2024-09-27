import './Stylesheets/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import { useState } from 'react';

export default function Login({ toggleLogin }) {
    const [signUp, setSignUp] = useState(false)
    const toggleSignup = () => {
        setSignUp((prevState) => !prevState)
    }
    return (
        <div className="login-overlay">
            <div className="LoginContainer">
                <button className="close-btn" onClick={toggleLogin}>
                    <FontAwesomeIcon icon={faTimes} className="rotated-plus" /> {/* Use the icon here */}
                </button>
                
                {signUp ?<h1> Sign Up </h1>: <h1> Sign In </h1>}

                <div className="login-options">
                {signUp ? <span className="bottom-message">Already have an account? <span onClick={toggleSignup} className='link'>Sign Up</span></span>:
                <span className="bottom-message">Don't have an account? <span onClick={toggleSignup} className='link'>Sign In</span></span>}

                 { signUp ? <button className="login-google">Sign up with Google</button>:
                 <button className="login-google">Sign in with Google</button>}
                 {  signUp ? <button className="login-facebook">Sign up with Facebook</button>:
                   <button className="login-facebook">Log in with Facebook</button>}
              
                    
                    <div className="divider-container">
                        <div className="divider"></div>
                        <span className="or-text">or</span>
                        <div className="divider"></div>
                    </div>
                    
                    {signUp ? <button className="login-email">Sign up with Email</button>: <button className="login-email">Log in with Email</button>}
                </div>
            </div>
        </div>
    );
}

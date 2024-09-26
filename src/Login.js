import './Stylesheets/Login.css';

export default function Login() {
    return (
        <div className="LoginContainer">
            <h1> Sign In </h1>

            <div className="login-options">
                <button className="login-google">Log in with Google</button>
                <button className="login-facebook">Log in with Facebook</button>
                
                <div className="divider-container">
                    <div className="divider"></div>
                    <span className="or-text">or</span>
                    <div className="divider"></div>
                </div>
                
                <button className="login-email">Log in with Email</button>
            </div>
        </div>
    );
}

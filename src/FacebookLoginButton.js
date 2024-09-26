import { useEffect } from 'react';
import './Stylesheets/FacebookLoginButton.css'

const FacebookLoginButton = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });
    };
  }, []);

  const handleFBLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('User logged in', response.authResponse);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };

  return (
    <div className='FacebookLoginButton'>
    <button onClick={handleFBLogin}>
      Log in with Facebook
    </button>
    </div>
  );
};

export default FacebookLoginButton;

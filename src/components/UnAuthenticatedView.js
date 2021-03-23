import React from 'react';
import '../index.css';
import { GoogleLogin } from 'react-google-login';

const UnAuthenticatedView = ({ responseGoogle }) => {
    return (
      <div>
        <GoogleLogin 
          clientId={process.env.REACT_APP_CLIENT_ID} 
          buttonText="Login" 
          onSuccess={responseGoogle} 
          onFailure={responseGoogle}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'} 
        />
      </div>
    );
  };

export default UnAuthenticatedView

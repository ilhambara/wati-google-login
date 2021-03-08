import React, { useEffect, useState } from 'react';
import './index.css';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // User Data
  const [user, setUser] = useState({name:"", email:"", image:""})

  // Response
  const responseGoogle = async (response) => {
    const profile = await response.getBasicProfile();

    // Get Name
    console.log(profile.getName())
    // Get Image Profile
    console.log(profile.getImageUrl())
    // Get Email
    console.log(profile.getEmail())

    // Get User Data
    setUser({
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl()
    })
    
  }

  // Logout
  const logout = () => {
    setUser({name:"", email:"", image:""})
    setIsAuthenticated(false)
  }

  // Check User if not empty
  useEffect(() => {
    if(user.email.length > 0 || user.name.length > 0)
      setIsAuthenticated(true)
  }, [user])

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center">
        {isAuthenticated ? <AuthenticatedView user={user} logout={logout} /> : <UnAuthenticatedView responseGoogle={responseGoogle} />}
    </div>
  );
};

const AuthenticatedView = ({ user, logout }) => {
  return (
    <div className="max-w-2xl bg-gray-900 p-8 rounded-md tracking-wide shadow-xl">
      {/* User Information */}
        <div id="card-info" className="flex flex-col">
          <div className="flex py-3 justify-center">
            <img className="rounded-md border border-gray-300" src={user.image} alt="user avatar"></img>
          </div>
          <div className="text-yellow-300 text-center text-3xl font-bold py-3">
            <h1>{user.name}</h1>
          </div>
          <div className="text-yellow-300 text-center text-xl pt-3 pb-16">
            <h3>{user.email}</h3>
          </div>
          <div className="items-center self-center">
            <GoogleLogout
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          </div>
        </div>  
      {/* User Information */}
    </div>
  );
};

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

export default App;

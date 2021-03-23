import React, { useEffect, useState } from 'react';
import './index.css';
import AuthenticatedView from './components/AuthenticatedView';
import UnAuthenticatedView from './components/UnAuthenticatedView';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // User Data
  const [user, setUser] = useState({name:"", email:"", image:""});

  // Response
  const responseGoogle = async (response) => {
    const profile = await response.getBasicProfile();

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
        { isAuthenticated ?
            <AuthenticatedView user={user} logout={logout} />
            : 
            <UnAuthenticatedView responseGoogle={responseGoogle} />
        }
    </div>
  );
};

export default App;

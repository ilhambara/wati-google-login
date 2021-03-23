import React from 'react';
import '../index.css';
import { GoogleLogout } from 'react-google-login';
import Location from './useGeolocation';

const AuthenticatedView = ({ user, logout }) => {

    return (
      <>
      <div className="h-96 max-w-2xl bg-gray-900 mx-2 p-8 rounded-md tracking-wide shadow-xl">
        {/* User Information */}
          <div id="card-info" className="flex flex-col">
            <div className="flex py-3 justify-center">
              <img className="rounded-md border border-gray-300" src={user.image} alt="user avatar"></img>
            </div>
            <div className="text-yellow-300 text-center text-3xl font-bold py-3">
              <h1>{user.name}</h1>
            </div>
            <div className="text-yellow-300 text-center text-xl pt-3 pb-14">
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
        {/* User Location */}
          <Location />
        {/* User Location */}
      </>
    );
  };

export default AuthenticatedView

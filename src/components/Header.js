import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Ontwerp-zonder-titel.png';
import Logout from './Logout';
import '../styles/Profile.css';

const Header = ({ setAuth, auth }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuth(false);
  };

  const userId = localStorage.getItem('user_id');
  return (
    <header className="app-header">
      <img src={logo} alt="Motapp Logo" className="header-logo" />
      <div className="header-left">
        {auth && (
          <>
            <Link to={`/profile/${userId}`} className="header-button">
              <button className="profile-button" >My Profile</button>
            </Link>
            <Logout setAuth={setAuth} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
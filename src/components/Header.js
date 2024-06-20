import React from 'react';
import logo from '../assets/Ontwerp-zonder-titel.png';
import Logout from './Logout';



const Header = ({setAuth, auth}) => {
    
  
    return (
    <header className="app-header">
        <img src={logo} alt="Motapp Logo" className="header-logo" />
          <div className="header-left">
            {auth && <Logout setAuth={setAuth} />} {/* Logout button */}
          </div>
        </header>
      
    );
  };
  
  export default Header;
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css'; // Import CSS file for styling


const Logout = ({ setAuth }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Clear the access token from localStorage
      localStorage.removeItem('access_token');
      setAuth(false); // Update auth state
      navigate('/login'); // Navigate to login page after logout
    };
  
    return (
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    );
  };
  
  export default Logout;
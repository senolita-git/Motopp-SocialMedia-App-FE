import React, { useState } from 'react';
import '../styles/Login.css'; // Import CSS file for styling

const BASE_URL = 'http://localhost:8000/';


const Login = ({ setAuth, setDeneme }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            username,
            password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Store the access token (you can use localStorage or context for this)
          localStorage.setItem('access_token', data.access_token);
          setAuth(true);  // Update auth state
        } else {
          const errorData = await response.json();
          setError(`Login failed: ${errorData.detail}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Error during login');
      }
    };
  
    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  };
  
  export default Login;
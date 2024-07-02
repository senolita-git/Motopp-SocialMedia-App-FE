import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import logo from '../assets/Ontwerp-zonder-titel.png';

const BASE_URL = 'http://localhost:8000/';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + 'login', {
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
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_id', data.user_id); // Store the user_id in localStorage
        setAuth(true);
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
      <div className="login-box">
        <h1>Welcome</h1>
        <img src={logo} alt="Motapp Logo" className="app-logo" />
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {error && <div className="error">{error}</div>}
        </form>
        <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
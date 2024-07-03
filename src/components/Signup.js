import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000/';

const SignUp = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(BASE_URL + 'user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                setAuth(true);
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(`Sign-up failed: ${errorData.detail}`);
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            setError('Error during sign-up');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <div className='contents'>
                    <label htmlFor="email">Your email address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className='contents'>
                    <label htmlFor="username">Choose a username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        required
                    />
                </div>
                <div className='contents'>
                    <label htmlFor="password">Choose a password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                        required
                    />
                </div>
                <div className="terms">
                    By creating an account, you agree to our <a href="/terms-of-service">Terms of Service</a>.
                </div>
                <button type="submit">Create your account</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="back-to-login">
                <Link to="/login">Already have an account? Back to Login</Link>
            </div>
        </div>
    );
};

export default SignUp;
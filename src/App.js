import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Post from './components/Post';
import Login from './components/Login';
import Logout from './components/Logout';
import SignUp from './components/Signup';
import logo from '../src/assets/Ontwerp-zonder-titel.png'
import Header from './components/Header';
import Profile from './components/Profile';
import EditProfile from './components/Editprofile';

const BASE_URL = 'http://localhost:8000/';

function App() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAuth(true);

      fetch(BASE_URL + 'posts/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then(data => {
          console.log("Fetched data: ", data); // Log the data to check its structure
          if (Array.isArray(data)) {
            setPosts(data);
          } else {
            console.error("API response is not an array:", data);
          }
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
          alert("Error fetching posts");
        });
    }
  }, [auth]);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="/signup"
            element={auth ? <Navigate to="/" /> : <SignUp setAuth={setAuth} />}
          />
          <Route
            path="/"
            element={
              auth ? (
                <>
                  <Header setAuth={setAuth} auth={auth} /> {/* Only render Header when authenticated */}
                  <div className="app_posts">
                    {Array.isArray(posts) && posts.length > 0 ? (
                      posts.map(post => (
                        <Post key={post.id} post={post} />
                      ))
                    ) : (
                      <p>No posts available</p>
                    )}
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile/:user_id"  // Define user_id as a URL parameter
            element={
              auth ? (
                <>
                  <Header setAuth={setAuth} auth={auth} />
                  <Profile />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-profile"  // Add the new route for editing the profile
            element={
              auth ? (
                <>
                  <Header setAuth={setAuth} auth={auth} />
                  <EditProfile />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-profile"  // Add route for Edit Profile page
            element={
              auth ? (
                <>
                  <Header setAuth={setAuth} auth={auth} />
                  <EditProfile />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from './Post';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8000/';

const Profile = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [comments, setComments] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Assuming token is stored in localStorage
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch user data
                const userResponse = await fetch(`${BASE_URL}user/${user_id}`, { headers });
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch user's posts
                const postsResponse = await fetch(`${BASE_URL}user/${user_id}/posts`, { headers });
                const postsData = await postsResponse.json();
                setPosts(postsData);

                // Fetch user's friends
                const friendsResponse = await fetch(`${BASE_URL}user/${user_id}/friends`, { headers });
                const friendsData = await friendsResponse.json();
                setFriends(friendsData);

                // Fetch user's comments
                const commentsResponse = await fetch(`${BASE_URL}user/${user_id}/comments`, { headers });
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user_id]); // Include user_id as a dependency to trigger useEffect on user_id change

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        <img src={`${BASE_URL}${user.profile_picture_url}` || 'default_profile_picture.jpg'} alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <h2>{user.username}</h2>
                        <p>{user.name} {user.surname}</p>
                        <p>{user.bio}</p>
                        <p><a href="{user.social_media_link}" className="small-link">{user.social_media_link}</a></p>
                    </div>
                    <div className="profile-stats">
                        <p>{friends.length} <br/> Friends</p>
                        <p>{comments.length} <br/> Comments</p>
                    </div>
                    <br/>
                    <div className="profile-actions">
                        <button onClick={() => navigate('/edit-profile')}>Edit Profile</button> {/* Update button */}
                        <button>Add Friend</button>
                    </div>
                </div>
            </div>
            <div className="posts-wall">
                <h2 className="posts-header">Your Wall</h2>
                {Array.isArray(posts) && posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
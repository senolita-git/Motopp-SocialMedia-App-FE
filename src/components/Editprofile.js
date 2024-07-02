import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePictureUpload from './FileUpload'; // import your file upload component
import '../styles/EditProfile.css';

const BASE_URL = 'http://localhost:8000/';

const EditProfile = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        bio: '',
        social_media_link: '',
    });

    const [profilePicture, setProfilePicture] = useState('');

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch user data
                const userResponse = await axios.get(`${BASE_URL}user/${user_id}`, { headers });
                setUser(userResponse.data);
                setProfilePicture(userResponse.data.profile_picture_url);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const headers = { 'Authorization': `Bearer ${token}` };

            await axios.put(`${BASE_URL}user/${user_id}`, user, { headers });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleUpload = (newProfilePictureUrl) => {
        setProfilePicture(newProfilePictureUrl);
    };

    return (
        <div className="edit-profile-page">
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label>Profile Image</label>
                    <div className="profile-image-upload">
                        <img src={`${BASE_URL}${user.profile_picture_url}` || 'default_profile_picture.jpg'} alt="Profile" />
                        <ProfilePictureUpload onUpload={handleUpload} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} disabled />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" name="surname" value={user.surname} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <textarea name="bio" value={user.bio} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Website</label>
                    <input type="text" name="social_media_link" value={user.social_media_link} onChange={handleChange} />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => window.history.back()}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProfile;
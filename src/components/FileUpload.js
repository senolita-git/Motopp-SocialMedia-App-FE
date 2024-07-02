import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:8000/user/profile-picture', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpload(response.data.profile_picture_url);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ProfilePictureUpload;
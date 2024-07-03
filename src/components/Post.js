import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Post.css';

const BASE_URL = 'http://localhost:8000/';

function Post({ post }) {
    const [imageUrl, setImageUrl] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showButtons, setShowButtons] = useState(false); // State to control the visibility of the "Post" and "Cancel" buttons

    useEffect(() => {
        if (post.image_url) {
            if (post.image_url_type === 'absolute') {
                setImageUrl(post.image_url);
            } else {
                setImageUrl(BASE_URL + post.image_url);
            }
        }

        const fetchComments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}posts/${post.id}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [post.image_url, post.image_url_type, post.id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.post(
                `${BASE_URL}posts/${post.id}/comments`,
                { content: newComment },
                { headers }
            );
            if (response.status === 201) {
                setComments([...comments, response.data]);
                setNewComment('');
                setShowButtons(false);
                console.log('Comment added successfully:', response.data);
            } else {
                console.error('Failed to add comment:', response);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleCancelComment = () => {
        setNewComment(''); // Clear the comment input
        setShowButtons(false); // Hide the "Post" and "Cancel" buttons
    };

    return (
        <div className="post">
            {post.image_url ? (
                <div>
                    <img className="post_image" src={imageUrl} alt="Post" />
                    {post.caption && <p className="post_caption">{post.caption}</p>}
                </div>
            ) : (
                <p>{post.text}</p>
            )}
            <p>{post.user.username}</p>
            <p>{new Date(post.timestamp).toLocaleString()}</p>

            <div className="comments-section">
                {comments.map((comment, index) => (
                    <p key={index} className="comment"><strong>{comment.user.username}:</strong> {comment.content}</p>
                ))}
            </div>

            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    onFocus={() => setShowButtons(true)} // Show the "Post" and "Cancel" buttons when input gains focus
                />
                {showButtons && (
                    <div>
                        <button type="submit">Post</button>
                        <button type="button" onClick={handleCancelComment}>Cancel</button> {/* Add the "Cancel" button */}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Post;
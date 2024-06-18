import React, {useState, useEffect} from "react";
import '../styles/Post.css'

const BASE_URL = 'http://localhost:8000/';

function Post({ post }) {
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      if (post.image_url) {
        if (post.image_url_type === 'absolute') {
          setImageUrl(post.image_url);
        } else {
          setImageUrl(BASE_URL + post.image_url);
        }
      }
    }, [post.image_url, post.image_url_type]);
  
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
      </div>
    );
  }
  
  export default Post;
import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blogs-website-backend-11ek.onrender.com/api/blogs', {
        title,
        content,
      });
      setMessage(response.data.message);
      setTitle('');
      setContent('');
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage('Error creating blog. Please try again.');
    }
  };

  return (
    <div className="create-post-both-container">
      <div className="create-post-container">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="Add">ADD BLOG</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <div className="Motivational-message">
        <p>
        Go on, post that quirky thought you've been nurturing in your mind – the internet's a wild jungle, and your ideas are like glitter in the foliage! 🌟🌿
        </p>
      </div>
    </div>
  );
};

export default CreatePost;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBlog.css";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        alert("Failed to fetch blog details.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, { title, content });
      navigate(`/`);
    } catch (err) {
      console.error("Failed to update blog:", err);
      alert("An error occurred while updating the blog.");
    }
  };

  return (
    <div className="edit-blog-container">
      <h1>Update Blog</h1>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditBlog;

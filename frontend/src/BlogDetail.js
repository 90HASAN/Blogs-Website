import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://blogs-website-backend-11ek.onrender.com/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch the blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  const handleDelete = async () => {

    try {
      await axios.delete(`https://blogs-website-backend-11ek.onrender.com/api/blogs/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("An error occurred while deleting the blog.");
    }
  };

  return (
    <div className="blog-detail-container">
      <div className="blog-content">
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>

      <div className="blog-buttons">
        <button onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">
          Delete
          </button>
      </div>
    </div>
  );
}

export default BlogDetail;

import React, { useState, useEffect } from "react";
import "./Recent.css";
import { Link } from "react-router-dom";

function Recent() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/blogs");
          const data = await response.json();
          setBlogs(data);
        } catch (err) {
          console.error("Failed to fetch blogs:", err);
        }
      };

      fetchBlogs();
    }, []);


    return (
        <div className="recent-post-container">
          <h3 className="recent-post-title">RECENT POSTS</h3>
          {blogs.map((blogs) => (
          <div className="recent-posts-list">
              <Link to={`/blog/${blogs.id}`} key={blogs.id} className="recent-post-item">{blogs.title}</Link>
              <hr />
          </div>
          ))}
        </div>
    
    );
}

export default Recent;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();

        const likedState = data.reduce((acc, blog) => {
          acc[blog.id] = blog.liked;
          return acc;
        }, {});
  
        setBlogs(data);
        setLikedBlogs(likedState);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
  
    fetchBlogs();
  }, []);

  const handleHeartClick = async (id) => {
    setLikedBlogs((prevState) => {
      const newState = { ...prevState, [id]: !prevState[id] };

      fetch(`http://localhost:5000/api/blogs/${id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: newState[id] }),
      });
  
      return newState;
    });
  };
  
  
  

  return (
    <div className="home-container">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-entry">
          <small className="blog-date">
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            }).format(new Date(blog.created_at))}
          </small>

          <h1>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </h1>
          <p>{blog.content}</p>

          <div
            className={`heart-button ${likedBlogs[blog.id] ? "filled" : ""}`}
            onClick={() => handleHeartClick(blog.id)}
          >
            <svg
              className="heart-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;


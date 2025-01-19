import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Favourites.css";

const Favourite = () => {
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);

  useEffect(() => {
    const fetchFavouriteBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favourite-blogs');
        setFavouriteBlogs(response.data);
      } catch (error) {
        console.error('Error fetching favourite blogs:', error);
      }
    };

    fetchFavouriteBlogs();
  }, []);

  return (
    <div className="favourite-container">
      <h1 className="favourite-heading">Favourite Blogs</h1>
      {favouriteBlogs.length > 0 ? (
        <ul className="favourite-list">
          {favouriteBlogs.map((blog, index) => (
            <li key={index} className="favourite-item">
              <h2 className="favourite-title">{blog.title}</h2>
              <p className="favourite-content">{blog.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="favourite-empty">No favourite blogs found.</p>
      )}
    </div>
  );
};

export default Favourite;


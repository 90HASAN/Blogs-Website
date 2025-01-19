import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="header-title">BLOGS</h1>
      <nav className="header-nav">
        <button className="nav-button" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="nav-button" onClick={() => navigate("/create-post")}>
          New Post
        </button>
        <button className="nav-button" onClick={() => navigate("/favourites")}>
          Favourite
        </button>
      </nav>
    </header>
  );
}

export default Header;

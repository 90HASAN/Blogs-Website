import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Recent from "./Recent";
import CreatePost from "./CreatePost";
import "./App.css";
import BlogDetail from "./BlogDetail";
import EditBlog from "./EditBlog";
import Favourite from "./Favourite";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<>
              <Home />
              <Recent />
            </>} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route path="/favourites" element={<Favourite />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



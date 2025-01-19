import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Blogs Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

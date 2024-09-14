import React from 'react';
import './App.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>EXPLORE</h4>
          <p>Home for Sale</p>
          <p>Homes for Rent</p>
          <p>Sold Homes</p>
        </div>
        <div className="footer-section">
          <h4>RESOURCES</h4>
          <p>Blog</p>
          <p>How To</p>
          <p>Help</p>
        </div>
        <div className="footer-section">
          <h4>ABOUT US</h4>
          <p>About Us</p>
          <p>Contact</p>
          <p>Sitemap</p>
        </div>
        <div className="footer-section">
          <h4>LEGAL</h4>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Accessibility</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

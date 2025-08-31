import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>✨ Sparkling Clean</h3>
            <p>
              Professional cleaning services that transform your space 
              and exceed your expectations.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Residential Cleaning</a></li>
              <li><a href="#services">Commercial Cleaning</a></li>
              <li><a href="#services">Deep Cleaning</a></li>
              <li><a href="#services">Window Cleaning</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📞 (555) 123-4567</p>
            <p>✉️ info@sparklingclean.com</p>
            <p>📍 Greater Metropolitan Area</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Sparkling Clean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

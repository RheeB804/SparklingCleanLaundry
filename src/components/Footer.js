import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/images/logo/Logo.png" 
                alt="Sparkling Clean Logo" 
                className="footer-logo-image"
              />
              <h3>Sparkling Clean Laundry</h3>
            </div>
            <p>
              Fresh, Fast & Flawless Laundry Care That Sparkles. 
              From self-service to same-day fluff & fold, and even pickup & delivery.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">Self Serve Laundry</Link></li>
              <li><Link to="/flufffold">Fluff & Fold</Link></li>
              <li><Link to="/pickupdelivery">Pickup & Delivery</Link></li>
              <li><Link to="/services">All Services</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#contact">Get Quote</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p>📞 (323) 840-1696</p>
              <p>✉️ info@thesparklingcleanlaundry.com</p>
              <p>📍 5127 Whittier Blvd, East Los Angeles, CA 90022</p>
              <p>🕒 Mon-Thurs: 6AM-12AM | Fri-Sun: 5AM-1AM</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Sparkling Clean Laundry. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

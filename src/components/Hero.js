import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Fresh, Fast & Flawless Laundry Care
            <span className="highlight"> That Sparkles</span>
          </h1>
          <p className="hero-subtitle">
            From self-service to same-day fluff & fold, and even pickup & delivery — 
            we make laundry day effortless. Let us handle the load, so you can enjoy 
            more of your day.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="primary-button">All Services</Link>
            <Link to="/flufffold" className="secondary-button">Fluff & Fold</Link>
            <Link to="/pickupdelivery" className="secondary-button">Pickup & Delivery</Link>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🧹</span>
            <span>Professional Staff</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <span>Highly Rated</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚀</span>
            <span>Same Day Service</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

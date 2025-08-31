import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Professional Cleaning Services
            <span className="highlight"> That Sparkle</span>
          </h1>
          <p className="hero-subtitle">
            Transform your space with our expert cleaning solutions. 
            From homes to offices, we deliver spotless results every time.
          </p>
          <div className="hero-actions">
            <button className="primary-button">Book Now</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🧹</span>
            <span>Professional Staff</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <span>5-Star Rated</span>
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

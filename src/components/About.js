import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Sparkling Clean</h2>
            <p className="about-lead">
              We're passionate about creating clean, healthy environments for our clients.
            </p>
            <p>
              Founded with a simple mission to provide exceptional cleaning services, 
              Sparkling Clean has been serving our community with dedication and 
              attention to detail since 2020.
            </p>
            <p>
              Our team of certified professionals uses eco-friendly products and 
              proven techniques to ensure your space not only looks clean but 
              feels fresh and healthy.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Star Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <span>🧹✨</span>
              <p>Professional Cleaning Team</p>
            </div>
          </div>
        </div>
        
        <div className="about-features">
          <div className="feature-item">
            <span className="feature-icon">🌱</span>
            <h3>Eco-Friendly</h3>
            <p>Safe, non-toxic cleaning products</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🕒</span>
            <h3>Reliable</h3>
            <p>Always on time, every time</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <h3>Insured</h3>
            <p>Fully licensed and insured</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

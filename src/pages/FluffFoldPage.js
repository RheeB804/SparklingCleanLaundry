import React from 'react';
import './FluffFoldPage.css';

const FluffFoldPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>Fluff & Fold Service</h1>
          <p>Professional laundry service with next-day or same-day turnaround</p>
        </div>
      </div>

      <section className="service-details">
        <div className="container">
          <div className="service-grid">
            <div className="service-content">
              <h2>What is Fluff & Fold?</h2>
              <p>
                Our Fluff & Fold service takes the hassle out of laundry day. Simply drop off your clothes, 
                and we'll wash, dry, and fold them to perfection. Perfect for busy professionals, families, 
                and anyone who wants to save time.
              </p>
              
              <div className="service-features">
                <div className="feature-item">
                  <span className="feature-icon">⏰</span>
                  <div>
                    <h3>Same-Day Service</h3>
                    <p>Drop off in the morning, pick up in the evening</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">👔</span>
                  <div>
                    <h3>Professional Care</h3>
                    <p>Expert handling of all fabric types and special items</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">📦</span>
                  <div>
                    <h3>Neatly Folded</h3>
                    <p>Your clothes returned perfectly folded and organized</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-pricing">
              <h3>Pricing</h3>
              <div className="pricing-card">
                <div className="price-item">
                  <span className="item">Next-Day Service</span>
                  <span className="price">$1.75/lb</span>
                </div>
                <div className="price-item">
                  <span className="item">Same-Day Service</span>
                  <span className="price">$2.25/lb</span>
                </div>
                <div className="price-item">
                  <span className="item">Comforters</span>
                  <span className="price">$15.00 each</span>
                </div>
                <div className="price-item">
                  <span className="item">Minimum Charge</span>
                  <span className="price">20lbs</span>
                </div>
              </div>
              
              <button className="cta-button">Get Started</button>
            </div>
          </div>

          <div className="process-steps">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Drop Off</h3>
                <p>Bring your laundry to our location during business hours</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>We Wash</h3>
                <p>Professional cleaning with quality detergents and care</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>We Fold</h3>
                <p>Expert folding and organization of all items</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Pick Up</h3>
                <p>Collect your clean, folded laundry ready to go</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FluffFoldPage;

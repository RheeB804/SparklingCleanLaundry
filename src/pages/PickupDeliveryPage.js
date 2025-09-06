import React from 'react';
import './PickupDeliveryPage.css';

const PickupDeliveryPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>Pickup & Delivery Service</h1>
          <p>Convenient laundry service right to your doorstep</p>
        </div>
      </div>

      <section className="service-details">
        <div className="container">
          <div className="service-grid">
            <div className="service-content">
              <h2>Door-to-Door Laundry Service</h2>
              <p>
                Skip the trip to the laundromat! Our pickup and delivery service brings the convenience 
                of professional laundry care directly to your home or office. Schedule a pickup, and 
                we'll handle the rest.
              </p>
              
              <div className="service-features">
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <div>
                    <h3>Free Pickup & Delivery</h3>
                    <p>No extra charges for pickup and delivery within our service area</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <div>
                    <h3>Easy Scheduling</h3>
                    <p>Book online or call us to schedule your pickup and delivery</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <div>
                    <h3>Secure & Safe</h3>
                    <p>Your items are tracked and protected throughout the entire process</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-pricing">
              <h3>Pricing</h3>
              <div className="pricing-card">
                <div className="price-item">
                  <span className="item">Regular Clothes</span>
                  <span className="price">$1.50/lb</span>
                </div>
                <div className="price-item">
                  <span className="item">Delicate Items</span>
                  <span className="price">$2.75/lb</span>
                </div>
                <div className="price-item">
                  <span className="item">Comforters</span>
                  <span className="price">$18.00 each</span>
                </div>
                <div className="price-item">
                  <span className="item">Minimum Order</span>
                  <span className="price">$15.00</span>
                </div>
                <div className="price-item highlight">
                  <span className="item">Pickup & Delivery</span>
                  <span className="price">FREE</span>
                </div>
              </div>
              
              <button className="cta-button">Schedule Pickup</button>
            </div>
          </div>

          <div className="service-areas">
            <h2>Service Areas</h2>
            <div className="areas-grid">
              <div className="area-card">
                <h3>Downtown</h3>
                <p>Free pickup and delivery within 5 miles of downtown</p>
              </div>
              <div className="area-card">
                <h3>Suburbs</h3>
                <p>Extended service area with same-day delivery</p>
              </div>
              <div className="area-card">
                <h3>Business District</h3>
                <p>Office pickup and delivery for busy professionals</p>
              </div>
            </div>
          </div>

          <div className="process-steps">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Schedule</h3>
                <p>Book your pickup time online or call us</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>We Pick Up</h3>
                <p>Our driver collects your laundry at the scheduled time</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>We Clean</h3>
                <p>Professional washing, drying, and folding</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>We Deliver</h3>
                <p>Fresh, clean laundry delivered back to you</p>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <h2>Ready to Get Started?</h2>
            <p>Contact us to schedule your first pickup or learn more about our service areas.</p>
            <div className="contact-buttons">
              <button className="primary-button">Call Now</button>
              <button className="secondary-button">Book Online</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PickupDeliveryPage;

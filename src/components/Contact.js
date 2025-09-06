import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    communication: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
                // EmailJS configuration from environment variables with fallback
                const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_eoeh9ih';
                const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_ee6bopj';
                const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'QJkLPhuVA-hGrOrJO';
                
                // Debug: Check if environment variables are loaded
                console.log('Environment variables:', {
                  serviceId,
                  templateId,
                  publicKey
                });
                
                // Debug: Check if using environment variables or fallback
                if (process.env.REACT_APP_EMAILJS_SERVICE_ID) {
                  console.log('Using environment variables');
                } else {
                  console.log('Using fallback values');
                }
    
    // Send email using EmailJS
    emailjs.send(serviceId, templateId, {
      to_name: 'Bryan',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      communication: formData.communication,
      message: formData.message,
      reply_to: formData.email
    }, publicKey)
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      alert('Thank you for your message! We\'ll get back to you soon.');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        communication: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('EmailJS Error Details:', error);
      console.error('Error Status:', error.status);
      console.error('Error Text:', error.text);
      
      let errorMessage = 'Sorry, there was an error sending your message. ';
      
      if (error.status === 400) {
        errorMessage += 'Please check that all required fields are filled.';
      } else if (error.status === 401) {
        errorMessage += 'Authentication error. Please contact us directly.';
      } else if (error.status === 403) {
        errorMessage += 'Access denied. Please try again later.';
      } else {
        errorMessage += 'Please try again or call us directly at (323) 840-1696.';
      }
      
      alert(errorMessage);
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Ready to make your laundry sparkle? Contact us today!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>(323) 840-1696</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>info@thesparklingcleanlaundry.com</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Service Area</h4>
                <p>5127 Whittier Blvd, East Los Angeles, CA 90022</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <div>
                <h4>Hours</h4>
                <p>Mon-Thurs: 6AM-12AM (Last load at 10:30PM)<br/>Fri: 6AM-1AM (Last load at 11:30AM)<br/>Sat-Sun: 5AM-1AM (Last load at 11:30AM)</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Service</option>
                  <option value="residential">Self Serve Laundry</option>
                  <option value="commercial">Fluff & Fold</option>
                  <option value="deep-cleaning">Pickup & Delivery Laundry Service</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="communication"
                  value={formData.communication}
                  onChange={handleChange}
                  required
                >
                  <option value="">Preferred Contact Method</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="text">Text Message</option>
                  <option value="any">Any Method</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your cleaning needs..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

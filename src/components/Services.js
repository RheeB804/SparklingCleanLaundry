import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: '🏠',
      title: 'Residential Cleaning',
      description: 'Complete home cleaning services including kitchens, bathrooms, bedrooms, and living areas.',
      price: 'From $89'
    },
    {
      id: 2,
      icon: '🏢',
      title: 'Commercial Cleaning',
      description: 'Professional office and commercial space cleaning for businesses of all sizes.',
      price: 'From $149'
    },
    {
      id: 3,
      icon: '🧽',
      title: 'Deep Cleaning',
      description: 'Intensive cleaning service for move-ins, move-outs, or special occasions.',
      price: 'From $199'
    },
    {
      id: 4,
      icon: '🪟',
      title: 'Window Cleaning',
      description: 'Interior and exterior window cleaning for crystal clear views.',
      price: 'From $59'
    },
    {
      id: 5,
      icon: '🛋️',
      title: 'Carpet Cleaning',
      description: 'Professional carpet and upholstery cleaning and stain removal.',
      price: 'From $79'
    },
    {
      id: 6,
      icon: '✨',
      title: 'Post-Construction',
      description: 'Comprehensive cleaning after renovations or construction projects.',
      price: 'From $299'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Professional cleaning solutions tailored to your needs</p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-price">{service.price}</div>
              <button className="service-button">Book Service</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

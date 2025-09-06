import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: '🧺🌀',
      title: 'Self Serve Laundry',
      description: 'Our modern washers and dryers make laundry quick, easy, and affordable. Whether you’re handling a small load or tackling a week’s worth of clothes, enjoy a clean, safe, and comfortable space with plenty of machines ready when you are. Open daily with convenient hours, our self-serve option gives you full control over your laundry routine.',
      price: 'Starts at $4 per load',
      button: 'View Location',
      link: '/contact'
    },
    {
      id: 2,
      icon: '🧺✨',
      title: 'Fluff & Fold',
      description: 'Skip laundry day and let us do the work for you! Drop off your clothes and our team will wash, dry, and neatly fold them with care. Priced by the pound, it’s the perfect way to save time and enjoy fresh, ready-to-wear laundry without the hassle.',
      price: 'Starts at $1.75 per pound',
      button: 'Learn More',
      link: '/FluffFold'
    },
    {
      id: 3,
      icon: '🚚🧺✨',
      title: 'Pickup & Delivery Laundry Service',
      description: 'Laundry made effortless. We’ll come to your door, pick up your clothes, wash and fold them with care, then deliver them back fresh and neatly packed. Perfect for busy families, professionals, or businesses — all with simple scheduling and reliable service.',
      price: 'Starts at $2.25 per pound',
      button: 'Book Now',
      link: '/PickupDelivery'
    },
    /*{
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
    }*/
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-price">{service.price}</div>
              <Link to={service.link} className="service-button">{service.button}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

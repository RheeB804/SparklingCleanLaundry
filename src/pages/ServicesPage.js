import React from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Professional cleaning services tailored to your needs</p>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default ServicesPage;


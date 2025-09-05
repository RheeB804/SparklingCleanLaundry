import React from 'react';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Your trusted cleaning partner for over a decade</p>
        </div>
      </div>
      <About />
    </div>
  );
};

export default AboutPage;


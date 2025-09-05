import React from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch for a free quote</p>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;


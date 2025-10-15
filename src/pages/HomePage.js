import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <div className="page-container">
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default HomePage;


import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to determine active section based on scroll position
  const getActiveSection = () => {
    const sections = ['home', 'services', 'about', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for header height

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          return section;
        }
      }
    }
    return 'home'; // Default to home
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setActiveSection(getActiveSection());
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial active section
    setActiveSection(getActiveSection());

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav') && !e.target.closest('.mobile-menu-toggle')) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 className="text-2xl font-bold">✨ Sparkling Clean</h1>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
          </ul>
          {/* Mobile CTA Button */}
          <div className="mobile-cta-container">
            <button className="mobile-cta-button" onClick={closeMenu}>
              Get Free Quote
            </button>
          </div>
        </nav>

        <div className="header-actions">
          <button className="cta-button">Get Quote</button>
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          style={{ top: '80px', zIndex: 999 }}
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;

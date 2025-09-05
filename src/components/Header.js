import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Get active page based on current route
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/services') return 'services';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    return 'home';
  };

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
          <Link to="/" onClick={closeMenu} className="logo-link">
            <img 
              src="/images/logo/Logo.png" 
              alt="Sparkling Clean Logo" 
              className="logo-image"
            />
            <span className="logo-text">Sparkling Clean Laundry</span>
          </Link>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${getActivePage() === 'home' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={`nav-link ${getActivePage() === 'services' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${getActivePage() === 'about' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${getActivePage() === 'contact' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                Contact
              </Link>
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

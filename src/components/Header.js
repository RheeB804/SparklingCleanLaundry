import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  let language, toggleLanguage;
  try {
    const languageContext = useLanguage();
    language = languageContext.language;
    toggleLanguage = languageContext.toggleLanguage;
  } catch (error) {
    console.error('Error in useLanguage:', error);
    language = 'en';
    toggleLanguage = () => {};
  }
  
  let t;
  try {
    const translationContext = useTranslation();
    t = translationContext.t;
  } catch (error) {
    console.error('Error in useTranslation:', error);
    t = (key) => key; // Fallback function
  }


  const toggleMenu = () => {
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
              alt="Sparkling Clean Laundry - Professional Laundry Services in East Los Angeles" 
              className="logo-image"
              width="200"
              height="50"
              loading="eager"
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
                {t('nav.home')}
              </Link>
            </li>
            <li className="nav-dropdown">
              <Link 
                to="/services" 
                className={`nav-link ${getActivePage() === 'services' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                {t('nav.services')}
              </Link>
              <ul className="nav-submenu">
                <li>
                  <Link 
                    to="/flufffold" 
                    className="nav-sublink" 
                    onClick={closeMenu}
                  >
                    {t('nav.fluffFold')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pickupdelivery" 
                    className="nav-sublink" 
                    onClick={closeMenu}
                  >
                    {t('nav.pickupDelivery')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/commercial" 
                    className="nav-sublink" 
                    onClick={closeMenu}
                  >
                    {t('nav.commercial')}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${getActivePage() === 'about' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${getActivePage() === 'contact' ? 'active' : ''}`} 
                onClick={closeMenu}
              >
                {t('nav.contact')}
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
          <div className="language-toggle-container">
            <span className="language-label">
              {(language || 'en') === 'en' ? 'Language:' : 'Idioma:'}
            </span>
            <button 
              className="language-toggle" 
              onClick={() => {
                if (toggleLanguage) {
                  toggleLanguage();
                }
              }} 
              title={(language || 'en') === 'en' ? 'Switch to Spanish / Cambiar a Español' : 'Switch to English / Cambiar a Inglés'}
            >
              {(language || 'en') === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
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

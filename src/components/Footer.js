import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { trackPhoneCall, trackEmailClick, trackLocationClick } from '../utils/analytics';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img 
                src="/images/logo/Logo.png" 
                alt="Sparkling Clean Laundry - Professional Laundry Services in East Los Angeles" 
                className="footer-logo-image"
                width="50"
                height="50"
                loading="lazy"
              />
              <h3>Sparkling Clean Laundry</h3>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/p/The-Sparkling-Clean-Laundry-61558002214985/" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/thesparklingcleanlaundry/" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://maps.app.goo.gl/4ksBygX3r4TxgFX98" className="social-link" aria-label="Google Maps" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section footer-services">
            <h4>{t('footer.ourServices')}</h4>
            <ul>
              <li><Link to="/services">{t('nav.allServices')}</Link></li>
              <li><Link to="/flufffold">{t('nav.fluffFold')}</Link></li>
              <li><Link to="/pickupdelivery">{t('nav.pickupDelivery')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section footer-links">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><a href="#contact">{t('footer.getQuote')}</a></li>
            </ul>
          </div>
          
          <div className="footer-section footer-contact-info">
            <h4>{t('footer.contactInfo')}</h4>
            <div className="footer-contact">
              <p><a href="tel:+13238401696" onClick={() => trackPhoneCall('(323) 840-1696')}>📞 (323) 840-1696</a></p>
              <p><a href="mailto:info@thesparklingcleanlaundry.com" onClick={() => trackEmailClick('info@thesparklingcleanlaundry.com')}>✉️ info@thesparklingcleanlaundry.com</a></p>
              <p><a href="https://maps.app.goo.gl/4ksBygX3r4TxgFX98" target="_blank" rel="noopener noreferrer" onClick={() => trackLocationClick('5127 Whittier Blvd, East Los Angeles, CA 90022')}>📍 5127 Whittier Blvd, East Los Angeles, CA 90022</a></p>
              <p><a href="https://maps.app.goo.gl/4ksBygX3r4TxgFX98" target="_blank" rel="noopener noreferrer" onClick={() => trackLocationClick('Business Hours - Google Maps')}>🕒 Mon-Thurs: 6AM-12AM | Fri-Sun: 5AM-1AM</a></p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Sparkling Clean Laundry. {t('footer.copyright')}</p>
          <div className="footer-legal">
            <button>{t('footer.legal.privacy')}</button>
            <button>{t('footer.legal.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

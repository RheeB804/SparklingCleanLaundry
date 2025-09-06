import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
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
            <p>
              {t('footer.description')}
            </p>
            <div className="social-links">
              <button className="social-link" aria-label="Facebook">📘</button>
              <button className="social-link" aria-label="Instagram">📷</button>
              <button className="social-link" aria-label="Twitter">🐦</button>
              <button className="social-link" aria-label="LinkedIn">💼</button>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.ourServices')}</h4>
            <ul>
              <li><Link to="/services">{t('nav.allServices')}</Link></li>
              <li><Link to="/flufffold">{t('nav.fluffFold')}</Link></li>
              <li><Link to="/pickupdelivery">{t('nav.pickupDelivery')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><a href="#contact">{t('footer.getQuote')}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.contactInfo')}</h4>
            <div className="footer-contact">
              <p>📞 (323) 840-1696</p>
              <p>✉️ info@thesparklingcleanlaundry.com</p>
              <p>📍 5127 Whittier Blvd, East Los Angeles, CA 90022</p>
              <p>🕒 Mon-Thurs: 6AM-12AM | Fri-Sun: 5AM-1AM</p>
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

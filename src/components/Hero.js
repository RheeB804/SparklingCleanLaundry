import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('hero.title')}
            <span className="highlight"> {t('hero.titleHighlight')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/services" className="primary-button">{t('hero.allServices')}</Link>
            <Link to="/flufffold" className="secondary-button">{t('hero.fluffFold')}</Link>
            <Link to="/pickupdelivery" className="secondary-button">{t('hero.pickupDelivery')}</Link>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🧹</span>
            <span>{t('hero.features.professional')}</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <span>{t('hero.features.rated')}</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🚀</span>
            <span>{t('hero.features.sameDay')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

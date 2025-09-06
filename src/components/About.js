import React from 'react';
import './About.css';
import { useTranslation } from '../hooks/useTranslation';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>{t('about.title')}</h2>
            <p className="about-lead">
              {t('about.lead')}
            </p>
            <p>
              {t('about.description1')}
            </p>
            <p>
              {t('about.description2')}
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">1000s</span>
                <span className="stat-label">{t('about.stats.clients')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.5+</span>
                <span className="stat-label">{t('about.stats.rating')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">{t('about.stats.experience')}</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <span>🚚🧺✨</span>
              <p>Professional Washing Team</p>
            </div>
          </div>
        </div>
        
        <div className="about-features">
          <div className="feature-item">
            <span className="feature-icon">🌱</span>
            <h3>{t('about.features.eco.title')}</h3>
            <p>{t('about.features.eco.description')}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🕒</span>
            <h3>{t('about.features.reliable.title')}</h3>
            <p>{t('about.features.reliable.description')}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <h3>{t('about.features.insured.title')}</h3>
            <p>{t('about.features.insured.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

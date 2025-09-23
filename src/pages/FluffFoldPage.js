import React from 'react';
import './FluffFoldPage.css';
import { useTranslation } from '../hooks/useTranslation';

const FluffFoldPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>{t('services.fluffFold.pageTitle')}</h1>
          <p>{t('services.fluffFold.pageSubtitle')}</p>
          <div className="page-header-actions">
            <a href="tel:+13238401696" className="primary-button">{t('services.fluffFold.cta.button')}</a>
            <a href="/contact" className="secondary-button">{t('services.fluffFold.cta.getQuote')}</a>
          </div>
        </div>
      </div>

      <section className="service-details">
        <div className="container">
          <div className="service-grid">
            <div className="service-content">
              <h2>{t('services.fluffFold.whatIs')}</h2>
              <p>
                {t('services.fluffFold.whatIsDescription')}
              </p>
              
              <div className="service-features">
                <div className="feature-item">
                  <span className="feature-icon">⏰</span>
                  <div>
                    <h3>{t('services.fluffFold.features.sameDay.title')}</h3>
                    <p>{t('services.fluffFold.features.sameDay.description')}</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">👔</span>
                  <div>
                    <h3>{t('services.fluffFold.features.professional.title')}</h3>
                    <p>{t('services.fluffFold.features.professional.description')}</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">📦</span>
                  <div>
                    <h3>{t('services.fluffFold.features.folded.title')}</h3>
                    <p>{t('services.fluffFold.features.folded.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-pricing">
              <h3>{t('services.fluffFold.pricing')}</h3>
              <div className="pricing-card">
                <div className="price-item">
                  <div className="item-content">
                    <span className="item">{t('services.fluffFold.pricingItems.nextDay.title')}</span>
                    <span className="item-helper">{t('services.fluffFold.pricingItems.nextDay.helper').split('\n').map((line, index) => (
                      <span key={index}>{line}{index === 0 && <br />}</span>
                    ))}</span>
                  </div>
                  <span className="price">{t('services.fluffFold.pricingItems.nextDay.price')}</span>
                </div>
                <div className="price-item">
                  <div className="item-content">
                    <span className="item">{t('services.fluffFold.pricingItems.sameDay.title')}</span>
                    <span className="item-helper">{t('services.fluffFold.pricingItems.sameDay.helper').split('\n').map((line, index) => (
                      <span key={index}>{line}{index === 0 && <br />}</span>
                    ))}</span>
                  </div>
                  <span className="price">{t('services.fluffFold.pricingItems.sameDay.price')}</span>
                </div>
                <div className="price-item">
                  <span className="item">{t('services.fluffFold.pricingItems.comforters.title')}</span>
                  <span className="price">{t('services.fluffFold.pricingItems.comforters.price')}</span>
                </div>
              </div>
              
              <button className="cta-button">Get Started</button>
            </div>
          </div>

          <div className="process-steps">
            <h2>{t('services.fluffFold.howItWorks')}</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>{t('services.fluffFold.steps.step1.title')}</h3>
                <p>{t('services.fluffFold.steps.step1.description')}</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>{t('services.fluffFold.steps.step2.title')}</h3>
                <p>{t('services.fluffFold.steps.step2.description')}</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>{t('services.fluffFold.steps.step3.title')}</h3>
                <p>{t('services.fluffFold.steps.step3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FluffFoldPage;

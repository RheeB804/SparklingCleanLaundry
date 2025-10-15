import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import './CommercialLaundryPage.css';

const CommercialLaundryPage = () => {
  const { t } = useTranslation();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      const headerHeight = 80; // Account for fixed header height
      const elementPosition = pricingSection.offsetTop;
      const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px buffer
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEO
        title={`${t('services.commercial.pageTitle')} - Sparkling Clean Laundry`}
        description={t('services.commercial.pageSubtitle')}
        keywords="commercial laundry service, business laundry, hotel laundry, restaurant laundry, East Los Angeles, bulk laundry, professional cleaning"
        canonical="/commercial"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": t('services.commercial.pageTitle'),
          "description": t('services.commercial.pageSubtitle'),
          "provider": {
            "@type": "LocalBusiness",
            "name": "Sparkling Clean Laundry",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "5127 Whittier Blvd",
              "addressLocality": "East Los Angeles",
              "addressRegion": "CA",
              "postalCode": "90022",
              "addressCountry": "US"
            },
            "telephone": "(323) 840-1696"
          },
          "areaServed": {
            "@type": "City",
            "name": "East Los Angeles"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Commercial Laundry Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Standard Commercial Service",
                  "description": "Full-service wash, dry & fold for businesses"
                },
                "price": "1.25",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "1.25",
                  "priceCurrency": "USD",
                  "unitText": "per pound"
                }
              }
            ]
          }
        }}
      />
      <div className="page-container commercial-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('services.commercial.pageTitle')}</h1>
          <p>{t('services.commercial.pageSubtitle')}</p>
          <div className="page-header-actions">
            <a href="tel:+13238401696" className="primary-button">{t('services.commercial.cta.button')}</a>
            <a href="/contact?service=commercial" className="secondary-button">{t('services.commercial.cta.getQuote')}</a>
            <button onClick={scrollToPricing} className="pricing-button">{t('services.commercial.cta.pricing')}</button>
          </div>
        </div>
      </div>

      <section className="service-details">
        <div className="container">
          <div className="service-grid">
            <div className="service-content">
              <h2>{t('services.commercial.whatIs')}</h2>
              <p>
                {t('services.commercial.whatIsDescription')}
              </p>
              
              <div className="service-features">
                <div className="feature-item">
                  <span className="feature-icon">🧺</span>
                  <div>
                    <h3>{t('services.commercial.features.fullService.title')}</h3>
                    <p>{t('services.commercial.features.fullService.description')}</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <div>
                    <h3>{t('services.commercial.features.pickupDelivery.title')}</h3>
                    <p>{t('services.commercial.features.pickupDelivery.description')}</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">🏢</span>
                  <div>
                    <h3>{t('services.commercial.features.customPrograms.title')}</h3>
                    <p>{t('services.commercial.features.customPrograms.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-pricing" id="pricing-section">
              <h3>{t('services.commercial.pricing')}</h3>
              <div className="pricing-card">
                <div className="price-item">
                  <div className="item-content">
                    <span className="item">{t('services.commercial.pricingItems.standard.title')}</span>
                    <span className="item-helper">{t('services.commercial.pricingItems.standard.helper').split('\n').map((line, index) => (
                      <span key={index}>{line}{index === 0 && <br />}</span>
                    ))}</span>
                  </div>
                  <span className="price">{t('services.commercial.pricingItems.standard.price')}</span>
                </div>
                <div className="price-item">
                  <div className="item-content">
                    <span className="item">{t('services.commercial.pricingItems.highVolume.title')}</span>
                    <span className="item-helper">{t('services.commercial.pricingItems.highVolume.helper').split('\n').map((line, index) => (
                      <span key={index}>{line}{index === 0 && <br />}</span>
                    ))}</span>
                  </div>
                  <span className="price">{t('services.commercial.pricingItems.highVolume.price')}</span>
                </div>
                <div className="price-item">
                  <div className="item-content">
                    <span className="item">{t('services.commercial.pricingItems.rush.title')}</span>
                    <span className="item-helper">{t('services.commercial.pricingItems.rush.helper').split('\n').map((line, index) => (
                      <span key={index}>{line}{index === 0 && <br />}</span>
                    ))}</span>
                  </div>
                  <span className="price">{t('services.commercial.pricingItems.rush.price')}</span>
                </div>
                <div className="price-item">
                  <div className="item-content">
                    <span className="item">{t('services.commercial.pricingItems.specialty.title')}</span>
                    <span className="item-helper">{t('services.commercial.pricingItems.specialty.helper').split('\n').map((line, index) => (
                      <span key={index}>{line}{index === 0 && <br />}</span>
                    ))}</span>
                  </div>
                  <span className="price">{t('services.commercial.pricingItems.specialty.price')}</span>
                </div>
              </div>
              
              <a href="/contact?service=commercial" className="cta-button">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>{t('services.commercial.howItWorks')}</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>{t('services.commercial.steps.step1.title')}</h3>
              <p>{t('services.commercial.steps.step1.description')}</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>{t('services.commercial.steps.step2.title')}</h3>
              <p>{t('services.commercial.steps.step2.description')}</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>{t('services.commercial.steps.step3.title')}</h3>
              <p>{t('services.commercial.steps.step3.description')}</p>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <h3>{t('services.commercial.steps.step4.title')}</h3>
              <p>{t('services.commercial.steps.step4.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="commercial-benefits">
        <div className="container">
          <h2>{t('services.commercial.benefits.title')}</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>{t('services.commercial.benefits.ecoFriendly.title')}</h3>
              <p>{t('services.commercial.benefits.ecoFriendly.description')}</p>
            </div>
            <div className="benefit-card">
              <h3>{t('services.commercial.benefits.serviceAreas.title')}</h3>
              <p>{t('services.commercial.benefits.serviceAreas.description')}</p>
            </div>
            <div className="benefit-card">
              <h3>{t('services.commercial.benefits.localBusiness.title')}</h3>
              <p>{t('services.commercial.benefits.localBusiness.description')}</p>
            </div>
            <div className="benefit-card">
              <h3>{t('services.commercial.benefits.contactInfo.title')}</h3>
              <p>{t('services.commercial.benefits.contactInfo.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('services.commercial.cta.title')}</h2>
            <p>{t('services.commercial.cta.description')}</p>
            <div className="cta-buttons">
              <a href="tel:+13238401696" className="primary-button">{t('services.commercial.cta.button')}</a>
              <a href="/contact?service=commercial" className="secondary-button">{t('services.commercial.cta.getQuote')}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default CommercialLaundryPage;

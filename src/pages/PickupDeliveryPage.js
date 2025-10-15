import React, { useState, useEffect } from 'react';
import './PickupDeliveryPage.css';
import { useTranslation } from '../hooks/useTranslation';
import { trackButtonClick, trackPhoneCall } from '../utils/analytics';
import SEO from '../components/SEO';

const PickupDeliveryPage = () => {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <>
      <SEO
        title={`${t('services.pickupDelivery.pageTitle')} - Sparkling Clean Laundry`}
        description={t('services.pickupDelivery.pageSubtitle')}
        keywords="pickup delivery laundry, door to door laundry, laundry pickup service, East Los Angeles, convenient laundry, home laundry service"
        canonical="/pickupdelivery"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": t('services.pickupDelivery.pageTitle'),
          "description": t('services.pickupDelivery.pageSubtitle'),
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
          "areaServed": [
            "East Los Angeles",
            "Whittier",
            "Montebello",
            "Pico Rivera",
            "Commerce"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Pickup & Delivery Laundry Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pickup & Delivery Service",
                  "description": "Door-to-door laundry pickup and delivery service"
                },
                "price": "2.25",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "2.25",
                  "priceCurrency": "USD",
                  "unitText": "per pound"
                }
              }
            ]
          }
        }}
      />
      <div className="page-container pickup-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('services.pickupDelivery.pageTitle')}</h1>
          <p>{t('services.pickupDelivery.pageSubtitle')}</p>
          <div className="page-header-actions">
            <a href="tel:+13238401696" className="primary-button" onClick={() => trackPhoneCall('(323) 840-1696')}>{t('services.pickupDelivery.cta.button')}</a>
            <a href="/contact?service=pickup-delivery" className="secondary-button" onClick={() => trackButtonClick('Get a Quote', 'PickupDelivery Header')}>{t('services.pickupDelivery.cta.getQuote')}</a>
            <button onClick={scrollToPricing} className="pricing-button">{t('services.pickupDelivery.cta.pricing')}</button>
          </div>
        </div>
      </div>

      <section className="service-details">
        <div className="container">
          <div className="service-grid">
            <div className="service-content">
              <h2>{t('services.pickupDelivery.whatIs')}</h2>
              <p>
                {t('services.pickupDelivery.whatIsDescription')}
              </p>
              
              <div className="service-features">
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <div>
                    <h3>{t('services.pickupDelivery.features.pickup.title')}</h3>
                    <p>{t('services.pickupDelivery.features.pickup.description')}</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <div>
                    <h3>{t('services.pickupDelivery.features.scheduling.title')}</h3>
                    <p>{t('services.pickupDelivery.features.scheduling.description')}</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <div>
                    <h3>{t('services.pickupDelivery.features.secure.title')}</h3>
                    <p>{t('services.pickupDelivery.features.secure.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-pricing" id="pricing-section">
              <h3>{t('services.pickupDelivery.pricing')}</h3>
              <div className="pricing-card">
                <div className="price-item">
                  <span className="item">{t('services.pickupDelivery.pricingItems.twoDay.title')}</span>
                  <span className="price">{t('services.pickupDelivery.pricingItems.twoDay.price')}</span>
                </div>
                <div className="price-item">
                  <span className="item">{t('services.pickupDelivery.pricingItems.comforters.title')}</span>
                  <span className="price">{t('services.pickupDelivery.pricingItems.comforters.price')}</span>
                </div>
                <div className="price-item">
                  <span className="item">{t('services.pickupDelivery.pricingItems.minimum.title')}</span>
                  <span className="price">{t('services.pickupDelivery.pricingItems.minimum.price')}</span>
                </div>
              </div>
              
              <a href="tel:+13238401696" className="cta-button">
                {isMobile ? t('services.pickupDelivery.cta.buttonMobile') : t('services.pickupDelivery.cta.buttonDesktop')}
              </a>
            </div>
          </div>

          <div className="service-areas">
            <h2>{t('services.pickupDelivery.serviceAreas')}</h2>
            <p>{t('services.pickupDelivery.serviceAreasDescription')}</p>
            <div className="areas-grid">
              {t('services.pickupDelivery.areas').map((area, index) => (
                <div key={index} className="area-card">
                  <h3>{area}</h3>
                </div>
              ))}
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

          <div className="contact-info">
            <h2>{t('services.pickupDelivery.cta.title')}</h2>
            <p>{t('services.pickupDelivery.cta.description')}</p>
            <div className="contact-buttons">
              <a href="tel:+13238401696" className="primary-button" onClick={() => trackPhoneCall('(323) 840-1696')}>{t('services.pickupDelivery.cta.button')}</a>
              <a href="/contact?service=pickup-delivery" className="secondary-button" onClick={() => trackButtonClick('Get a Quote', 'PickupDelivery CTA')}>{t('services.pickupDelivery.cta.getQuote')}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default PickupDeliveryPage;

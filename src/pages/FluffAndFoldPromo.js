import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from '../hooks/useTranslation';
import './FluffAndFoldPromo.css';

const FluffAndFoldPromo = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting || isSubmitted) {
      return;
    }
    
    // Set submission state
    setIsSubmitting(true);
    
    // EmailJS configuration from environment variables with fallback
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_eoeh9ih';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_yheb9sk';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'QJkLPhuVA-hGrOrJO';
    
    // Map service values to display names
    const getServiceDisplayName = (serviceValue) => {
      const serviceMap = {
        'fluffFold': t('landing.form.services.fluffFold'),
        'pickupDelivery': t('landing.form.services.pickupDelivery')
      };
      return serviceMap[serviceValue] || serviceValue;
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, {
      to_name: 'Bryan',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: getServiceDisplayName(formData.service),
      message: `New discount request from Fluff & Fold Promo page. Service needed: ${getServiceDisplayName(formData.service)}. Customer is interested in the 15% discount offer.`,
      reply_to: formData.email
    }, publicKey)
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      alert('Thank you! We\'ll contact you soon with your discount details.');
      
      // Mark as submitted and reset form
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: ''
      });
      
      // Reset submitted state after 10 seconds to allow new submissions
      setTimeout(() => {
        setIsSubmitted(false);
      }, 10000);
    })
    .catch((error) => {
      console.error('EmailJS Error Details:', error);
      
      let errorMessage = 'Sorry, there was an error sending your request. ';
      
      if (error.status === 400) {
        errorMessage += 'Please check that all required fields are filled.';
      } else if (error.status === 401) {
        errorMessage += 'Authentication error. Please contact us directly.';
      } else if (error.status === 403) {
        errorMessage += 'Access denied. Please try again later.';
      } else {
        errorMessage += 'Please try again or call us directly at (323) 840-1696.';
      }
      
      alert(errorMessage);
      
      // Reset submission state on error
      setIsSubmitting(false);
    });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="discount-badge">
                <span className="discount-text">{t('landing.discount')}</span>
              </div>
              <h1 className="hero-title">{t('landing.title')}</h1>
              <p className="hero-subtitle">{t('landing.subtitle')}</p>
              <p className="discount-description">{t('landing.discountDescription')}</p>
              
              <div className="hero-buttons">
                <a href="tel:+13238401696" className="primary-button">
                  📞 {t('landing.callNow')}
                </a>
                <a href="/flufffold" className="secondary-button">
                  ℹ️ {t('landing.learnMore')}
                </a>
              </div>
            </div>
            
            <div className="hero-form">
              <div className="form-container">
                <h2 className="form-title">{t('landing.form.title')}</h2>
                <form onSubmit={handleSubmit} className="discount-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('landing.form.name')}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('landing.form.phone')}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('landing.form.email')}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">{t('landing.form.service')}</option>
                      <option value="fluffFold">{t('landing.form.services.fluffFold')}</option>
                      <option value="pickupDelivery">{t('landing.form.services.pickupDelivery')}</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="primary-button form-submit"
                    disabled={isSubmitting || isSubmitted}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      'Request Sent!'
                    ) : (
                      <>🎉 {t('landing.form.submit')}</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👔</div>
              <h3>{t('landing.features.professional')}</h3>
              <p>Expert handling of all fabric types and special items</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>{t('landing.features.fast')}</h3>
              <p>Same-day or next-day service available</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>{t('landing.features.quality')}</h3>
              <p>100% satisfaction guarantee on all services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Don't miss out on your discount! Book now or call us today.</p>
            <div className="cta-buttons">
              <a href="tel:+13238401696" className="primary-button">
                📞 {t('landing.callNow')}
              </a>
              <a href="/flufffold" className="secondary-button">
                ℹ️ {t('landing.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FluffAndFoldPromo;

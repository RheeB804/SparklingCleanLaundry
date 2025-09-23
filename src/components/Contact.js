import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from '../hooks/useTranslation';
import { trackPhoneCall, trackEmailClick, trackLocationClick, trackContactFormSubmit } from '../utils/analytics';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    communication: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting || isSubmitted) {
      return;
    }
    
    // Check cooldown period (5 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmissionTime < 5000) {
      alert('Please wait a moment before submitting again.');
      return;
    }
    
    // Set submission state
    setIsSubmitting(true);
    setLastSubmissionTime(now);
    
    // EmailJS configuration from environment variables with fallback
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_eoeh9ih';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_ee6bopj';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'QJkLPhuVA-hGrOrJO';
    
    // Debug: Check if environment variables are loaded
    console.log('Environment variables:', {
      serviceId,
      templateId,
      publicKey
    });
    
    // Debug: Check if using environment variables or fallback
    if (process.env.REACT_APP_EMAILJS_SERVICE_ID) {
      console.log('Using environment variables');
    } else {
      console.log('Using fallback values');
    }

    // Map service values to display names
    const getServiceDisplayName = (serviceValue) => {
      const serviceMap = {
        'residential': t('contact.form.services.residential'),
        'commercial': t('contact.form.services.commercial'),
        'deep-cleaning': t('contact.form.services.deepCleaning')
      };
      return serviceMap[serviceValue] || serviceValue;
    };

    // Map communication values to display names
    const getCommunicationDisplayName = (commValue) => {
      const commMap = {
        'phone': t('contact.form.communicationMethods.phone'),
        'email': t('contact.form.communicationMethods.email'),
        'text': t('contact.form.communicationMethods.text'),
        'any': t('contact.form.communicationMethods.any')
      };
      return commMap[commValue] || commValue;
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, {
      to_name: 'Bryan',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: getServiceDisplayName(formData.service),
      communication: getCommunicationDisplayName(formData.communication),
      message: formData.message,
      reply_to: formData.email
    }, publicKey)
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      alert('Thank you for your message! We\'ll get back to you soon.');
      
      // Track successful form submission
      trackContactFormSubmit('contact_form');
      
      // Mark as submitted and reset form
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        communication: '',
        message: ''
      });
      
      // Reset submitted state after 10 seconds to allow new submissions
      setTimeout(() => {
        setIsSubmitted(false);
      }, 10000);
    })
    .catch((error) => {
      console.error('EmailJS Error Details:', error);
      console.error('Error Status:', error.status);
      console.error('Error Text:', error.text);
      
      let errorMessage = 'Sorry, there was an error sending your message. ';
      
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
    <section id="contact" className="contact">
      <div className="contact-container">
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>{t('contact.contactInfo')}</h3>
        <a href="tel:+13238401696" className="contact-item" onClick={() => trackPhoneCall('(323) 840-1696')}>
          <span className="contact-icon">📞</span>
          <div>
            <h4>{t('contact.phone')}</h4>
            <p>(323) 840-1696</p>
          </div>
        </a>
            <a href="mailto:info@thesparklingcleanlaundry.com" className="contact-item" onClick={() => trackEmailClick('info@thesparklingcleanlaundry.com')}>
              <span className="contact-icon">✉️</span>
              <div>
                <h4>{t('contact.email')}</h4>
                <p>info@thesparklingcleanlaundry.com</p>
              </div>
            </a>
            <a href="https://maps.app.goo.gl/4ksBygX3r4TxgFX98" target="_blank" rel="noopener noreferrer" className="contact-item" onClick={() => trackLocationClick('5127 Whittier Blvd, East Los Angeles, CA 90022')}>
              <span className="contact-icon">📍</span>
              <div>
                <h4>{t('contact.location')}</h4>
                <p>5127 Whittier Blvd, East Los Angeles, CA 90022</p>
              </div>
            </a>
            <a href="https://maps.app.goo.gl/4ksBygX3r4TxgFX98" target="_blank" rel="noopener noreferrer" className="contact-item" onClick={() => trackLocationClick('Business Hours - Google Maps')}>
              <span className="contact-icon">🕒</span>
              <div>
                <h4>{t('contact.hours')}</h4>
                <p>{t('contact.hoursDetails.weekdays')}<br/>{t('contact.hoursDetails.friday')}<br/>{t('contact.hoursDetails.weekend')}</p>
              </div>
            </a>
          </div>
          
          <div className="contact-form">
            <h3>{t('contact.contactUs')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.form.phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('contact.form.service')}</option>
                  <option value="residential">{t('contact.form.services.residential')}</option>
                  <option value="commercial">{t('contact.form.services.commercial')}</option>
                  <option value="deep-cleaning">{t('contact.form.services.deepCleaning')}</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="communication"
                  value={formData.communication}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('contact.form.communication')}</option>
                  <option value="phone">{t('contact.form.communicationMethods.phone')}</option>
                  <option value="email">{t('contact.form.communicationMethods.email')}</option>
                  <option value="text">{t('contact.form.communicationMethods.text')}</option>
                  <option value="any">{t('contact.form.communicationMethods.any')}</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder={t('contact.form.message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  'Message Sent!'
                ) : (
                  t('contact.form.submit')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

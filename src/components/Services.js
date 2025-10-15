import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const Services = () => {
  const { t } = useTranslation();

  const mainService = {
    id: 1,
    icon: '🧺🌀',
    title: t('services.selfServe.title'),
    description: t('services.selfServe.description'),
    price: t('services.selfServe.price'),
    button: t('services.selfServe.button'),
    link: '/contact'
  };

  const subServices = [
    {
      id: 2,
      icon: '🧺✨',
      title: t('services.fluffFold.title'),
      description: t('services.fluffFold.description'),
      price: t('services.fluffFold.price'),
      button: t('services.fluffFold.button'),
      link: '/flufffold'
    },
    {
      id: 3,
      icon: '🚚🧺✨',
      title: t('services.pickupDelivery.title'),
      description: t('services.pickupDelivery.description'),
      price: t('services.pickupDelivery.price'),
      button: t('services.pickupDelivery.button'),
      link: '/contact?service=pickup-delivery'
    },
    {
      id: 4,
      icon: '🏢🧺✨',
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
      price: t('services.commercial.price'),
      button: t('services.commercial.button'),
      link: '/contact?service=commercial'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-hierarchy">
          {/* Main Service */}
          <div className="main-service">
            <div className="service-card main-service-card">
              <div className="service-icon">{mainService.icon}</div>
              <h3 className="service-title">{mainService.title}</h3>
              <p className="service-description">{mainService.description}</p>
              <div className="service-price">{mainService.price}</div>
              <Link to={mainService.link} className="service-button">{mainService.button}</Link>
            </div>
          </div>

          {/* Sub Services */}
          <div className="sub-services">
            <h4 className="sub-services-title">{t('services.specializedServices')}</h4>
            <div className="sub-services-grid">
              {subServices.map((service) => (
                <div key={service.id} className="service-card sub-service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-price">{service.price}</div>
                  <Link to={service.link} className="service-button">{service.button}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
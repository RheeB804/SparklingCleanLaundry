import React from 'react';
import Services from '../components/Services';
import { useTranslation } from '../hooks/useTranslation';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>{t('services.title')}</h1>
          <p>{t('services.subtitle')}</p>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default ServicesPage;


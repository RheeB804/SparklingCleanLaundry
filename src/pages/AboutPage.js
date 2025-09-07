import React from 'react';
import About from '../components/About';
import { useTranslation } from '../hooks/useTranslation';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>{t('about.title')}</h1>
          <p>{t('about.lead')}</p>
        </div>
      </div>
      <About />
    </div>
  );
};

export default AboutPage;


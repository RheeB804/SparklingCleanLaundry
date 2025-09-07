import React from 'react';
import Contact from '../components/Contact';
import { useTranslation } from '../hooks/useTranslation';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;


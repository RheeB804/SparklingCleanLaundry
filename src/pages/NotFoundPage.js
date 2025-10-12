import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-icon">🚫</div>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <a href="/" className="primary-button">
              🏠 Go Home
            </a>
            <a href="/contact" className="secondary-button">
              📞 Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

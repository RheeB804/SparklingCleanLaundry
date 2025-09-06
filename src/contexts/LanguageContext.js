import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English first

  // Initialize language after component mounts
  useEffect(() => {
    const initializeLanguage = () => {
      // Check URL parameter first
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      
      if (urlLang && (urlLang === 'en' || urlLang === 'es')) {
        setLanguage(urlLang);
        return;
      }
      
      // Check localStorage
      const savedLanguage = localStorage.getItem('sparkling-clean-language');
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        setLanguage(savedLanguage);
        return;
      }
      
      // Check browser language
      const browserLang = navigator.language || navigator.userLanguage;
      
      if (browserLang.startsWith('es')) {
        setLanguage('es');
        return;
      }
      
      // Default to English
      setLanguage('en');
    };

    initializeLanguage();
  }, []);

  useEffect(() => {
    localStorage.setItem('sparkling-clean-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Listen for URL changes to detect lang parameter
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      
      if (urlLang && (urlLang === 'en' || urlLang === 'es') && urlLang !== language) {
        setLanguage(urlLang);
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleUrlChange);
    
    // Also check on mount
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'es' : 'en';
      return newLang;
    });
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isSpanish: language === 'es',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

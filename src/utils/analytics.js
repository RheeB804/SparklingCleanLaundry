// Analytics tracking utilities
export const trackEvent = (eventName, parameters = {}) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
  
  // Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  }
};

// Specific tracking functions for business actions
export const trackPhoneCall = (phoneNumber) => {
  trackEvent('phone_call', {
    phone_number: phoneNumber,
    event_category: 'engagement',
    event_label: 'phone_click'
  });
};

export const trackEmailClick = (emailAddress) => {
  trackEvent('email_click', {
    email_address: emailAddress,
    event_category: 'engagement',
    event_label: 'email_click'
  });
};

export const trackLocationClick = (location) => {
  trackEvent('location_click', {
    location: location,
    event_category: 'engagement',
    event_label: 'location_click'
  });
};

export const trackContactFormSubmit = (formType) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    event_category: 'conversion',
    event_label: 'contact_form'
  });
};

export const trackServicePageView = (serviceName) => {
  trackEvent('service_page_view', {
    service_name: serviceName,
    event_category: 'engagement',
    event_label: 'service_view'
  });
};

export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
    event_category: 'engagement',
    event_label: 'cta_click'
  });
};

export const trackQuoteRequest = (source) => {
  trackEvent('quote_request', {
    source: source,
    event_category: 'conversion',
    event_label: 'quote_request'
  });
};

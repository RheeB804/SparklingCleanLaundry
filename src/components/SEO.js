import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  twitterTitle, 
  twitterDescription, 
  twitterImage,
  structuredData 
}) => {
  const defaultTitle = "Sparkling Clean Laundry - Professional Laundry Services in East Los Angeles";
  const defaultDescription = "Professional laundry services in East Los Angeles. Self-serve laundry, fluff & fold, and pickup & delivery services. Open daily with convenient hours. Call (323) 840-1696!";
  const defaultKeywords = "laundry service, East Los Angeles, fluff and fold, pickup delivery, self serve laundry, professional cleaning, 5127 Whittier Blvd";
  const defaultImage = "/images/logo/Logo.png";
  const baseUrl = "https://thesparklingcleanlaundry.com";

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageImage = ogImage || defaultImage;
  const pageCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Sparkling Clean Laundry" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:title" content={ogTitle || pageTitle} />
      <meta property="og:description" content={ogDescription || pageDescription} />
      <meta property="og:image" content={`${baseUrl}${pageImage}`} />
      <meta property="og:site_name" content="Sparkling Clean Laundry" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageCanonical} />
      <meta property="twitter:title" content={twitterTitle || pageTitle} />
      <meta property="twitter:description" content={twitterDescription || pageDescription} />
      <meta property="twitter:image" content={`${baseUrl}${pageImage}`} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="East Los Angeles" />
      <meta name="geo.position" content="34.0239;-118.1720" />
      <meta name="ICBM" content="34.0239, -118.1720" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="5127 Whittier Blvd" />
      <meta name="business:contact_data:locality" content="East Los Angeles" />
      <meta name="business:contact_data:region" content="CA" />
      <meta name="business:contact_data:postal_code" content="90022" />
      <meta name="business:contact_data:country_name" content="United States" />
      <meta name="business:contact_data:phone_number" content="(323) 840-1696" />
      <meta name="business:contact_data:email" content="info@thesparklingcleanlaundry.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

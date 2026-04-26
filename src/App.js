import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FluffFoldPage from './pages/FluffFoldPage';
import PickupDeliveryPage from './pages/PickupDeliveryPage';
import CommercialLaundryPage from './pages/CommercialLaundryPage';
import FluffAndFoldPromo from './pages/FluffAndFoldPromo';
import NotFoundPage from './pages/NotFoundPage';
import PayInvoicePage from './pages/PayInvoicePage';
import AdminInvoicePage from './pages/AdminInvoicePage';

function Chrome({ children }) {
  const { pathname } = useLocation();
  const bare = pathname.startsWith('/pay/') || pathname.startsWith('/admin');
  if (bare) return children;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Chrome>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/flufffold" element={<FluffFoldPage />} />
              <Route path="/pickupdelivery" element={<PickupDeliveryPage />} />
              <Route path="/commercial" element={<CommercialLaundryPage />} />
              <Route path="/fluffandfoldpromo" element={<FluffAndFoldPromo />} />
              <Route path="/pay/:invoiceId" element={<PayInvoicePage />} />
              <Route path="/admin/invoice" element={<AdminInvoicePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Chrome>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

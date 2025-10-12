import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import FluffAndFoldPromo from './pages/FluffAndFoldPromo';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/flufffold" element={<FluffFoldPage />} />
            <Route path="/pickupdelivery" element={<PickupDeliveryPage />} />
            <Route path="/fluffandfoldpromo" element={<FluffAndFoldPromo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

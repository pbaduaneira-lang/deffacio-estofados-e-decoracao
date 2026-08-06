import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const whatsappUrl = 'https://wa.me/5544998324148?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20estofados%20e%20decora%C3%A7%C3%B5es.';

  const handleWhatsAppClick = () => {
    if (typeof window.gtag_report_conversion === 'function') {
      return window.gtag_report_conversion(whatsappUrl);
    }
  };

  return (
    <footer className="app-footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <Logo />
        </div>

        <div className="footer-info">
          <div className="footer-item">
            <MapPin size={18} className="footer-icon" />
            <span>Mandaguari - PR</span>
          </div>

          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-item whatsapp-link"
            onClick={handleWhatsAppClick}
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle size={18} className="footer-icon whatsapp-icon" />
            <span>(44) 99832-4148</span>
          </a>
        </div>

        <div className="footer-credits">
          <span>by Prof. Edmilton</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

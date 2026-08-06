import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css'; // Opcional, para animações específicas do botão

const WhatsAppButton = ({ phoneNumber = "5544998324148", message = "Olá! Gostaria de saber mais sobre os estofados e decorações." }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    if (typeof window.gtag_report_conversion === 'function') {
      return window.gtag_report_conversion(whatsappUrl);
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn animate-fade-in"
      aria-label="Falar no WhatsApp"
      onClick={handleClick}
    >
      <MessageCircle size={32} color="#ffffff" />
    </a>
  );
};

export default WhatsAppButton;

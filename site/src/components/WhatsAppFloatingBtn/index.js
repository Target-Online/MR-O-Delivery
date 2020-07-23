import "./index.css";
import React from "react";

import appsettings from "components/FloatingBtn/node_modules/appsettings.json";

export const WhatsAppFloatingButton = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href={appsettings.socialLinks.whatsapp}
    className="wa-chat-btn-fixed wa-chat-btn-offset wa-chat-btn-base-cta wa-chat-btn-container-size-big wa-chat-btn-theme-cta-new-inverted"
  >
    <img
      className="wa-chat-btn-icon-cta-big"
      src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/image_2.6.png?463"
    />
    <div className="wa-chat-button-cta-text">Chat with us on Whatsapp</div>
  </a>
);

export default WhatsAppFloatingButton;

import "./index.css";
import React from "react";

import playStore from "assets/img/app-adverts/play-store.png";
import appStore from "assets/img/app-adverts/app-store.png";

export const FloatingButtons = () => (
  <span>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={"https://play.google.com/store/apps"}
      className="wa-chat-btn-fixed wa-chat-btn-offset wa-chat-btn-container-size-big wa-chat-btn-theme-cta-new-inverted"
    >
      <img
        style={{ marginBottom: 53 }}
        className="wa-chat-btn-icon-cta-big"
        src={playStore}
      />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={"https://www.apple.com/ios/app-store/"}
      className="wa-chat-btn-fixed wa-chat-btn-offset wa-chat-btn-container-size-big wa-chat-btn-theme-cta-new-inverted"
    >
      <img className="wa-chat-btn-icon-cta-big" src={appStore} />
    </a>
  </span>
);

export default FloatingButtons;
